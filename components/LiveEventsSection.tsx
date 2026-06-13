"use client";

import { useEffect, useMemo, useState } from "react";
import type { TourDate } from "@/lib/admin/types";

type LiveEventsSectionProps = {
  events: TourDate[];
};

type EventWithDate = {
  event: TourDate;
  date: Date | null;
  timestamp: number;
};

type GroupedEvents = {
  label: string;
  items: EventWithDate[];
};

function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function isValidHttpUrl(value: string): boolean {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

const monthLabelFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const shortDayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
});

const shortWeekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
});

export default function LiveEventsSection({ events }: LiveEventsSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<TourDate | null>(null);

  useEffect(() => {
    if (!selectedEvent) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEvent(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedEvent]);

  const groups = useMemo<GroupedEvents[]>(() => {
    const normalized: EventWithDate[] = events
      .map((event) => {
        const date = parseIsoDate(event.event_date);
        return {
          event,
          date,
          timestamp: date ? date.getTime() : Number.POSITIVE_INFINITY,
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp);

    const result: GroupedEvents[] = [];
    normalized.forEach((item) => {
      const label = item.date
        ? monthLabelFormatter.format(item.date).toUpperCase()
        : "DATE TBA";
      const existing = result.find((group) => group.label === label);
      if (existing) {
        existing.items.push(item);
        return;
      }
      result.push({ label, items: [item] });
    });

    return result;
  }, [events]);

  const selectedEventDate = selectedEvent
    ? parseIsoDate(selectedEvent.event_date)
    : null;
  const selectedEventHasTickets = selectedEvent
    ? isValidHttpUrl(selectedEvent.ticket_url)
    : false;
  const selectedEventIsFree = selectedEvent ? Boolean(selectedEvent.is_free) : false;
  const selectedEventIsSoldOut = selectedEvent
    ? Boolean(selectedEvent.is_sold_out)
    : false;

  return (
    <>
      <section
        id="dates"
        className="min-h-screen scroll-mt-24 bg-black px-6 pb-20 pt-32 text-white sm:px-10 sm:pb-24 lg:px-14"
      >
        <div className="mx-auto w-full max-w-[1250px]">
          <h1 className="font-anton text-[4rem] font-normal uppercase leading-[0.9] text-[#e7a43c] sm:text-[5.5rem] lg:text-[6.3rem]">
            Live Events
          </h1>
          <p className="mt-7 max-w-none text-lg leading-relaxed text-white/88 sm:whitespace-nowrap sm:text-xl">
            Find upcoming shows, sessions, and moments to experience Nathan
            Somevi live.
          </p>

          <div className="mt-20 space-y-16">
            {groups.length === 0 ? (
              <section>
                <h2 className="font-anton text-4xl uppercase leading-none text-[#e7a43c] sm:text-5xl">
                  Dates TBA
                </h2>
                <div className="mt-7 rounded-[16px] border border-white/12 bg-[#070707] px-6 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.32)] sm:px-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#e7a43c]">
                    Live Event
                  </p>
                  <h3 className="font-anton mt-5 text-3xl uppercase leading-none text-white sm:text-4xl">
                    New dates coming soon
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
                    No live events are scheduled right now. Check back for the
                    next Nathan Somevi date.
                  </p>
                </div>
              </section>
            ) : (
              groups.map((group) => (
                <section key={group.label}>
                  <h2 className="font-anton text-4xl uppercase leading-none text-[#e7a43c] sm:text-5xl">
                    {group.label}
                  </h2>
                  <div className="mt-7 space-y-5">
                    {group.items.map(({ event, date }) => {
                      const isFreeEvent = Boolean(event.is_free);
                      const isSoldOutEvent = Boolean(event.is_sold_out);
                      return (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => setSelectedEvent(event)}
                          className="group grid w-full gap-6 rounded-[16px] border border-white/12 bg-[#070707] px-6 py-7 text-left shadow-[0_18px_60px_rgba(0,0,0,0.32)] transition hover:border-[#e7a43c]/60 hover:bg-[#0b0b0b] sm:px-8 md:grid-cols-[minmax(0,1fr)_96px] md:items-center"
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#e7a43c]">
                                Live Event
                              </p>
                              {isSoldOutEvent ? (
                                <span className="rounded-full border border-[#e7a43c]/45 bg-[#e7a43c]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e7a43c]">
                                  Sold Out
                                </span>
                              ) : isFreeEvent ? (
                                <span className="rounded-full border border-[#e7a43c]/45 bg-[#e7a43c]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e7a43c]">
                                  Free Event
                                </span>
                              ) : null}
                            </div>
                            <h3 className="font-anton mt-5 text-3xl uppercase leading-none text-white sm:text-4xl">
                              {event.venue}
                            </h3>
                            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-base text-white/86 sm:text-lg">
                              <span>
                                {date
                                  ? fullDateFormatter.format(date)
                                  : "Date TBA"}
                              </span>
                              <span>{event.city || "Location TBA"}</span>
                            </div>
                          </div>

                          <div className="flex items-end justify-between gap-4 md:block md:text-right">
                            <span className="font-anton text-5xl uppercase leading-none text-[#e7a43c] sm:text-6xl">
                              {date ? shortDayFormatter.format(date) : "--"}
                            </span>
                            <span className="block text-xs font-semibold uppercase tracking-[0.34em] text-white/70 md:mt-2">
                              {date ? shortWeekdayFormatter.format(date) : "TBA"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </section>

      {selectedEvent ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="Close event details"
            onClick={() => setSelectedEvent(null)}
            className="absolute inset-0 bg-black/78 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-2xl rounded-t-[16px] border border-white/12 bg-[#070707] p-6 text-white shadow-2xl sm:rounded-[16px] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e7a43c]">
                  Live Event
                </p>
                <h3 className="font-anton text-3xl uppercase leading-tight sm:text-4xl">
                  {selectedEvent.venue}
                </h3>
                <p className="text-sm text-white/80">
                  {selectedEventDate
                    ? fullDateFormatter.format(selectedEventDate)
                    : "Date TBA"}
                </p>
                <p className="text-sm text-white/80">
                  {selectedEvent.city || "Location TBA"}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelectedEvent(null)}
                className="rounded-[8px] border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-8">
              {selectedEventIsSoldOut ? (
                <span className="inline-flex rounded-[8px] border border-[#e7a43c]/45 bg-[#e7a43c]/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#e7a43c]">
                  Sold Out
                </span>
              ) : selectedEventHasTickets ? (
                <a
                  href={selectedEvent.ticket_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-[8px] bg-[#e7a43c] px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:brightness-110"
                >
                  {selectedEventIsFree ? "Reserve Place" : "Get Tickets"}
                </a>
              ) : selectedEventIsFree ? (
                <span className="inline-flex rounded-[8px] border border-[#e7a43c]/40 bg-[#e7a43c]/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#e7a43c]">
                  Free Event
                </span>
              ) : (
                <span className="inline-flex cursor-not-allowed rounded-[8px] border border-white/20 px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  Tickets Unavailable
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
