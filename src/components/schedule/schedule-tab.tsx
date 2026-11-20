"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/components/app-state";
import { EventDetail } from "@/components/schedule/event-detail";
import { ChevronLeftIcon, ChevronRightIcon, SettingsIcon } from "@/components/icons";
import { Card, RedButton } from "@/components/ui";
import { BRAND, CALENDAR_MONTH, CALENDAR_YEAR, EVENT_META, WEEKDAYS } from "@/lib/constants";
import { weekdayOf } from "@/lib/format";
import type { EventType } from "@/lib/types";

export function ScheduleTab() {
  const { events, addEvent, setTab, openSubScreen } = useApp();
  const [selectedDay, setSelectedDay] = useState<number | null>(18);
  const [showAdd, setShowAdd] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2024-05-25");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<EventType>("practice");

  const detail = events.find((event) => event.id === detailId) ?? null;
  const firstWeekday = new Date(CALENDAR_YEAR, CALENDAR_MONTH - 1, 1).getDay();
  const daysInMonth = new Date(CALENDAR_YEAR, CALENDAR_MONTH, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const dotsByDay = useMemo(() => {
    const map = new Map<number, EventType[]>();
    events.forEach((event) => {
      const [year, month, day] = event.date.split("-").map(Number);
      if (year === CALENDAR_YEAR && month === CALENDAR_MONTH) {
        map.set(day, [...(map.get(day) ?? []), event.type]);
      }
    });
    return map;
  }, [events]);

  if (detail) {
    return <EventDetail event={detail} onBack={() => setDetailId(null)} />;
  }

  const dayEvents = events.filter((event) => {
    if (selectedDay === null) return event.date.startsWith("2024-05");
    return event.date === `2024-05-${String(selectedDay).padStart(2, "0")}`;
  });

  const save = () => {
    if (!title.trim() || !location.trim()) return;
    addEvent({
      type,
      title: title.trim(),
      date,
      startTime: "09:00",
      endTime: "11:00",
      location: location.trim(),
    });
    setTitle("");
    setLocation("");
    setShowAdd(false);
    const day = Number(date.split("-")[2]);
    if (date.startsWith("2024-05")) setSelectedDay(day);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <div className="flex items-center justify-between px-4 py-3.5 lg:px-8 lg:py-5" style={{ background: BRAND }}>
        <button type="button" className="text-white/80 lg:hidden" aria-label="ホームへ" onClick={() => setTab("home")}>
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-base font-bold text-white lg:text-xl">2024年5月 スケジュール</h2>
        <button type="button" className="text-white/80" aria-label="設定" onClick={() => openSubScreen("settings")}>
          <SettingsIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="border-b border-gray-100 bg-white px-3 pt-3 pb-4">
        <div className="mb-1 grid grid-cols-7">
          {WEEKDAYS.map((day, index) => (
            <div key={day} className={`py-1 text-center text-[11px] font-semibold ${index === 0 ? "text-red-600" : index === 6 ? "text-blue-600" : "text-gray-500"}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-0.5">
          {Array.from({ length: firstWeekday }).map((_, index) => (
            <div key={`blank-${index}`} />
          ))}
          {days.map((day) => {
            const types = dotsByDay.get(day) ?? [];
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                className="flex flex-col items-center rounded-lg py-1 transition-all"
                style={isSelected ? { background: BRAND } : {}}
              >
                <span className={`text-sm leading-none font-medium ${isSelected ? "text-white" : "text-gray-700"}`}>{day}</span>
                {types.length > 0 && (
                  <div className="mt-0.5 flex gap-0.5">
                    {types.slice(0, 3).map((eventType, index) => (
                      <div
                        key={`${day}-${eventType}-${index}`}
                        className="h-1 w-1 rounded-full"
                        style={{ background: isSelected ? "white" : EVENT_META[eventType].color }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 px-4 pt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 lg:space-y-0 lg:px-8">
        {selectedDay !== null && (
          <p className="text-xs font-bold text-gray-500 lg:col-span-2">
            5月{selectedDay}日（{weekdayOf(`2024-05-${String(selectedDay).padStart(2, "0")}`)}）のスケジュール
          </p>
        )}
        {dayEvents.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400 lg:col-span-2">この日の予定はありません</p>
        )}
        {dayEvents.map((event) => (
          <button key={event.id} type="button" onClick={() => setDetailId(event.id)} className="w-full text-left">
            <Card className="flex items-center gap-3 p-4 transition-shadow hover:shadow-md">
              <div className="w-1 self-stretch rounded-full" style={{ background: EVENT_META[event.type].color }} />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{event.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {event.startTime}〜{event.endTime}
                </p>
                <p className="text-xs text-gray-500">{event.location}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: EVENT_META[event.type].color }}>
                  {EVENT_META[event.type].label}
                </span>
                <ChevronRightIcon className="h-4 w-4 text-gray-300" />
              </div>
            </Card>
          </button>
        ))}

        {showAdd && (
          <Card className="border-[#8B1A1A]/30 p-4 lg:col-span-2">
            <h3 className="mb-3 text-sm font-bold">新しいイベント</h3>
            <div className="space-y-2.5">
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="タイトル" className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[#8B1A1A]" />
              <div className="grid grid-cols-2 gap-2">
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-[#8B1A1A]" />
                <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="場所" className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-[#8B1A1A]" />
              </div>
              <div className="flex gap-2">
                {(["practice", "match", "meeting"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setType(value)}
                    className="rounded-full px-3 py-1.5 text-xs font-bold"
                    style={type === value ? { background: EVENT_META[value].color, color: "white" } : { background: "#F3F4F6", color: "#6B7280" }}
                  >
                    {EVENT_META[value].label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <RedButton onClick={save}>保存</RedButton>
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm text-gray-600">
                  キャンセル
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowAdd(true)}
        className="fixed right-4 bottom-20 flex h-12 w-12 items-center justify-center rounded-full text-xl text-white shadow-lg lg:bottom-8"
        style={{ background: BRAND }}
        aria-label="予定を追加"
      >
        +
      </button>
    </div>
  );
}
