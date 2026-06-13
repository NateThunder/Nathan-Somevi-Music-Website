import { NextRequest, NextResponse } from "next/server";
import { getUploadedFile } from "@/lib/local-data/server";

const ACCEPTED_BUCKETS = new Set(["release-covers", "charts", "merch"]);

type Params = {
  params: Promise<{
    bucket: string;
    path: string;
  }>;
};

export async function GET(_: NextRequest, { params }: Params) {
  const { bucket, path } = await params;

  if (!ACCEPTED_BUCKETS.has(bucket)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const file = await getUploadedFile(bucket as "release-covers" | "charts" | "merch", path);
  if (!file) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(file.body, {
    headers: {
      "Content-Type": file.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
