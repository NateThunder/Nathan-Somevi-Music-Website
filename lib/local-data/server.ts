import { getCloudflareContext } from "@opennextjs/cloudflare";
import path from "path";

export type TableName =
  | "tour_dates"
  | "releases"
  | "release_platform_links"
  | "charts"
  | "merch_items";

type SiteContentRow = {
  key: string;
  value: unknown;
};

type D1DatabaseLike = {
  prepare(query: string): D1PreparedStatementLike;
};

type D1PreparedStatementLike = {
  bind(...values: unknown[]): D1PreparedStatementLike;
  all<T = Record<string, unknown>>(): Promise<{ results?: T[] }>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
};

type DataStore = Record<TableName, Record<string, unknown>[]> & {
  site_content: SiteContentRow[];
};

type QueryOptions = {
  orderBy?: string;
  ascending?: boolean;
  filters?: Record<string, string | number | boolean>;
  limit?: number;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "admin-data.json");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

declare global {
  interface CloudflareEnv {
    DB?: D1DatabaseLike;
  }
}

const tableColumns: Record<TableName, string[]> = {
  tour_dates: [
    "id",
    "event_date",
    "city",
    "venue",
    "ticket_url",
    "is_free",
    "is_sold_out",
    "order_index",
    "created_at",
    "updated_at",
  ],
  releases: [
    "id",
    "title",
    "subtitle",
    "cover_image_path",
    "release_date",
    "is_featured",
    "order_index",
    "created_at",
    "updated_at",
  ],
  release_platform_links: [
    "id",
    "release_id",
    "platform",
    "url",
    "order_index",
    "created_at",
    "updated_at",
  ],
  charts: [
    "id",
    "title",
    "image_path",
    "thumbnail_path",
    "url",
    "order_index",
    "created_at",
    "updated_at",
  ],
  merch_items: ["id", "title", "image_path", "url", "order_index", "created_at", "updated_at"],
};

const siteContentColumns = ["key", "value"];

const emptyStore = (): DataStore => ({
  tour_dates: [],
  releases: [],
  release_platform_links: [],
  charts: [],
  merch_items: [],
  site_content: [],
});

async function readStore(): Promise<DataStore> {
  try {
    const { readFile } = await import("fs/promises");
    const raw = await readFile(DATA_FILE, "utf8");
    return { ...emptyStore(), ...JSON.parse(raw) };
  } catch {
    return emptyStore();
  }
}

async function writeStore(store: DataStore) {
  const { mkdir, writeFile } = await import("fs/promises");
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

async function getDb() {
  try {
    return (await getCloudflareContext({ async: true })).env.DB;
  } catch {
    return undefined;
  }
}

function assertColumn(table: TableName | "site_content", column: string) {
  const columns = table === "site_content" ? siteContentColumns : tableColumns[table];
  if (!columns.includes(column)) {
    throw new Error(`Unsupported column: ${column}`);
  }
}

function dbValue(value: unknown) {
  if (typeof value === "boolean") return value ? 1 : 0;
  return value;
}

function normalizeRow<T>(table: TableName | "site_content", row: Record<string, unknown>) {
  if (table === "site_content") {
    const value = typeof row.value === "string" ? JSON.parse(row.value) : row.value;
    return { ...row, value } as T;
  }

  if (table === "tour_dates") {
    return {
      ...row,
      is_free: Boolean(row.is_free),
      is_sold_out: Boolean(row.is_sold_out),
    } as T;
  }

  if (table === "releases") {
    return {
      ...row,
      is_featured: Boolean(row.is_featured),
    } as T;
  }

  return row as T;
}

function matchesFilters(row: Record<string, unknown>, filters?: QueryOptions["filters"]) {
  if (!filters) return true;
  return Object.entries(filters).every(([key, value]) => row[key] === value);
}

function sortRows<T extends Record<string, unknown>>(rows: T[], opts: QueryOptions = {}) {
  if (!opts.orderBy) return rows;
  return [...rows].sort((a, b) => {
    const left = a[opts.orderBy as keyof T];
    const right = b[opts.orderBy as keyof T];
    if (left === right) return 0;
    const result = String(left ?? "").localeCompare(String(right ?? ""), undefined, {
      numeric: true,
    });
    return opts.ascending === false ? -result : result;
  });
}

function nowIso() {
  return new Date().toISOString();
}

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function fetchRows<T>(table: TableName | "site_content", opts: QueryOptions = {}) {
  const db = await getDb();
  if (db) {
    const where: string[] = [];
    const values: unknown[] = [];

    if (opts.filters) {
      Object.entries(opts.filters).forEach(([key, value]) => {
        assertColumn(table, key);
        where.push(`${key} = ?`);
        values.push(dbValue(value));
      });
    }

    let sql = `SELECT * FROM ${table}`;
    if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
    if (opts.orderBy) {
      assertColumn(table, opts.orderBy);
      sql += ` ORDER BY ${opts.orderBy} ${opts.ascending === false ? "DESC" : "ASC"}`;
    }
    if (typeof opts.limit === "number") {
      sql += " LIMIT ?";
      values.push(opts.limit);
    }

    const result = await db.prepare(sql).bind(...values).all<Record<string, unknown>>();
    return (result.results ?? []).map((row) => normalizeRow<T>(table, row));
  }

  const store = await readStore();
  const rows = store[table].filter((row) => matchesFilters(row, opts.filters));
  const sorted = sortRows(rows as Record<string, unknown>[], opts);
  const limited = typeof opts.limit === "number" ? sorted.slice(0, opts.limit) : sorted;
  return limited as T[];
}

export async function insertRow<T>(table: TableName, payload: Record<string, unknown>) {
  const db = await getDb();
  if (db) {
    const row: Record<string, unknown> = {
      id: newId(),
      ...payload,
      created_at: nowIso(),
      updated_at: nowIso(),
    };
    const columns = Object.keys(row).filter((key) => tableColumns[table].includes(key));
    const placeholders = columns.map(() => "?").join(", ");
    const values = columns.map((key) => dbValue(row[key]));
    await db
      .prepare(`INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`)
      .bind(...values)
      .run();
    const saved = await db
      .prepare(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`)
      .bind(row.id)
      .first<Record<string, unknown>>();
    if (!saved) throw new Error("Inserted row not found");
    return normalizeRow<T>(table, saved);
  }

  const store = await readStore();
  const row = {
    id: newId(),
    ...payload,
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  store[table] = [...store[table], row];
  await writeStore(store);
  return row as T;
}

export async function updateRow<T>(table: TableName, id: string, payload: Record<string, unknown>) {
  const db = await getDb();
  if (db) {
    const row: Record<string, unknown> = {
      ...payload,
      updated_at: nowIso(),
    };
    const columns = Object.keys(row).filter((key) => tableColumns[table].includes(key));
    if (!columns.length) throw new Error("No valid columns to update");
    const assignments = columns.map((key) => `${key} = ?`).join(", ");
    const values = columns.map((key) => dbValue(row[key]));
    await db
      .prepare(`UPDATE ${table} SET ${assignments} WHERE id = ?`)
      .bind(...values, id)
      .run();
    const saved = await db
      .prepare(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`)
      .bind(id)
      .first<Record<string, unknown>>();
    if (!saved) throw new Error("Row not found");
    return normalizeRow<T>(table, saved);
  }

  const store = await readStore();
  const index = store[table].findIndex((row) => row.id === id);
  if (index === -1) {
    throw new Error("Row not found");
  }
  const row = {
    ...store[table][index],
    ...payload,
    updated_at: nowIso(),
  };
  store[table][index] = row;
  await writeStore(store);
  return row as T;
}

export async function deleteRow(table: TableName, id: string) {
  const db = await getDb();
  if (db) {
    await db.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id).run();
    return;
  }

  const store = await readStore();
  store[table] = store[table].filter((row) => row.id !== id);
  await writeStore(store);
}

export async function upsertSiteContent(key: string, value: unknown) {
  const db = await getDb();
  if (db) {
    const serialized = JSON.stringify(value);
    await db
      .prepare(
        "INSERT INTO site_content (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
      )
      .bind(key, serialized)
      .run();
    return { key, value };
  }

  const store = await readStore();
  const row = { key, value };
  const index = store.site_content.findIndex((item) => item.key === key);
  if (index === -1) {
    store.site_content.push(row);
  } else {
    store.site_content[index] = row;
  }
  await writeStore(store);
  return row;
}

export function mediaPublicUrl(bucket: "release-covers" | "charts" | "merch", filePath: string) {
  return `/api/media/${bucket}/${encodeURIComponent(filePath)}`;
}

export async function uploadFileToBucket(
  bucket: "release-covers" | "charts" | "merch",
  filePath: string,
  file: File
) {
  const safePath = filePath.replace(/[^a-zA-Z0-9._-]/g, "_");
  const arrayBuffer = await file.arrayBuffer();
  const contentType = file.type || "application/octet-stream";
  const db = await getDb();

  if (db) {
    await db
      .prepare(
        `INSERT INTO admin_uploads (bucket, path, content_type, body_base64, created_at)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(bucket, path) DO UPDATE SET
           content_type = excluded.content_type,
           body_base64 = excluded.body_base64`
      )
      .bind(bucket, safePath, contentType, arrayBufferToBase64(arrayBuffer), nowIso())
      .run();
  } else {
    const { mkdir, writeFile } = await import("fs/promises");
    const bucketDir = path.join(UPLOAD_DIR, bucket);
    await mkdir(bucketDir, { recursive: true });
    await writeFile(path.join(bucketDir, safePath), Buffer.from(arrayBuffer));
  }

  return {
    path: safePath,
    publicUrl: mediaPublicUrl(bucket, safePath),
  };
}

export async function getUploadedFile(
  bucket: "release-covers" | "charts" | "merch",
  filePath: string
) {
  const safePath = filePath.replace(/[^a-zA-Z0-9._-]/g, "_");
  const db = await getDb();

  if (db) {
    const data = await db
      .prepare(
        "SELECT content_type, body_base64 FROM admin_uploads WHERE bucket = ? AND path = ? LIMIT 1"
      )
      .bind(bucket, safePath)
      .first<{ content_type: string; body_base64: string }>();
    if (!data) return null;
    return {
      body: base64ToBytes(data.body_base64),
      contentType: data.content_type,
    };
  }

  try {
    const { readFile } = await import("fs/promises");
    const buffer = await readFile(path.join(UPLOAD_DIR, bucket, safePath));
    return {
      body: buffer,
      contentType: contentTypeForPath(safePath),
    };
  } catch {
    return null;
  }
}

function contentTypeForPath(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".avif") return "image/avif";
  return "application/octet-stream";
}

function arrayBufferToBase64(arrayBuffer: ArrayBuffer) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(arrayBuffer).toString("base64");
  }

  let binary = "";
  const bytes = new Uint8Array(arrayBuffer);
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

function base64ToBytes(base64: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64, "base64");
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
