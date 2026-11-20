"use client";

import { useState } from "react";
import { AttendanceMemberList } from "@/components/attendance/attendance-member-list";
import { AnswerForm } from "@/components/schedule/event-detail";
import { useApp } from "@/components/app-state";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Card } from "@/components/ui";
import { BRAND, EVENT_META, WEEKDAYS, attendanceBg, attendanceColor, attendanceLabel } from "@/lib/constants";
import { formatJapaneseDate } from "@/lib/format";
import type { TeamEvent } from "@/lib/types";

type Filter = "all" | "pending" | "done";

export function AttendanceScreen() {
  const { events, attendance, updateAttendance, submitAttendance, reopenAttendance, closeSubScreen } = useApp();
  const [detail, setDetail] = useState<TeamEvent | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const current = detail ? events.find((event) => event.id === detail.id) ?? null : null;
  if (current) {
    const record = attendance[current.id] ?? { status: "undecided" as const, comment: "", submitted: false };
    return (
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
        <div className="flex items-center gap-3 px-4 py-3.5 lg:px-8" style={{ background: BRAND }}>
          <button type="button" onClick={() => setDetail(null)} className="text-white/80" aria-label="戻る">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-bold text-white">{current.title}</h2>
            <p className="text-[11px] text-white/70">
              {formatJapaneseDate(current.date)}　{current.startTime}〜{current.endTime}
            </p>
          </div>
        </div>
        <div className="space-y-4 px-4 pt-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0 lg:px-8">
          <Card className="overflow-hidden">
            <div className="border-b border-gray-100 px-5 py-4" style={{ background: EVENT_META[current.type].bg }}>
              <span className="mb-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: EVENT_META[current.type].color }}>
                {EVENT_META[current.type].label}
              </span>
              <h3 className="text-base font-bold text-gray-900">{current.title}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { icon: "📅", label: "日時", value: `${formatJapaneseDate(current.date)}　${current.startTime}〜${current.endTime}` },
                { icon: "📍", label: "場所", value: current.location },
                { icon: "⏰", label: "締切", value: `${formatJapaneseDate(current.date)} 18:00まで` },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3 px-5 py-3">
                  <span className="mt-0.5 text-sm">{row.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">{row.label}</p>
                    <p className="mt-0.5 text-sm text-gray-800">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 px-5 py-4">
              <p className="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">現在の出欠状況</p>
              <AttendanceMemberList eventId={current.id} />
            </div>
          </Card>
          <Card className="p-5">
            <p className="mb-4 text-sm font-bold text-gray-800">出欠の回答</p>
            {record.submitted ? (
              <div className="py-8 text-center">
                <div className="mb-4 text-5xl">{record.status === "attending" ? "✅" : "❌"}</div>
                <p className="text-base font-bold text-gray-800">「{attendanceLabel(record.status)}」で回答しました</p>
                {record.comment && <p className="mx-auto mt-2 max-w-xs rounded-xl bg-gray-50 px-4 py-2 text-xs text-gray-500">{record.comment}</p>}
                <button type="button" onClick={() => reopenAttendance(current.id)} className="mt-5 text-xs font-semibold underline" style={{ color: BRAND }}>
                  回答を変更する
                </button>
              </div>
            ) : (
              <AnswerForm
                status={record.status}
                comment={record.comment}
                onChange={(status, comment) => updateAttendance(current.id, status, comment)}
                onSubmit={() => submitAttendance(current.id)}
              />
            )}
          </Card>
        </div>
      </div>
    );
  }

  const pendingCount = events.filter((event) => !attendance[event.id]?.submitted).length;
  const shown = events.filter((event) => {
    const answered = attendance[event.id]?.submitted;
    if (filter === "pending") return !answered;
    if (filter === "done") return answered;
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <div className="flex items-center gap-3 px-4 py-3.5 lg:px-8" style={{ background: BRAND }}>
        <button type="button" onClick={closeSubScreen} className="text-white/80" aria-label="戻る">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="flex-1 text-base font-bold text-white">出欠確認</h2>
        {pendingCount > 0 && <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold text-white">未回答 {pendingCount}件</span>}
      </div>

      <div className="space-y-3 px-4 pt-5 lg:max-w-2xl lg:px-8">
        {pendingCount > 0 && (
          <div className="flex items-center gap-3 rounded-xl border px-4 py-3" style={{ background: "#FFF7ED", borderColor: "#FED7AA" }}>
            <span className="shrink-0 text-lg text-orange-500">⚠️</span>
            <p className="text-sm font-semibold text-orange-700">{pendingCount}件のイベントが未回答です。タップして回答してください。</p>
          </div>
        )}
        <div className="flex gap-2">
          {(
            [
              ["all", "すべて"],
              ["pending", "未回答"],
              ["done", "回答済み"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className="rounded-full px-4 py-1.5 text-xs font-bold"
              style={filter === key ? { background: BRAND, color: "white" } : { background: "#F3F4F6", color: "#6B7280" }}
            >
              {label}
            </button>
          ))}
        </div>
        {shown.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            <p className="mb-2 text-3xl">✅</p>
            <p className="text-sm font-medium">すべて回答済みです</p>
          </div>
        )}
        {shown.map((event) => {
          const record = attendance[event.id];
          const answered = Boolean(record?.submitted);
          const date = new Date(`${event.date}T00:00:00`);
          return (
            <button key={event.id} type="button" onClick={() => setDetail(event)} className="w-full text-left">
              <Card className="p-4 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-xl py-2" style={{ background: EVENT_META[event.type].bg }}>
                    <p className="text-[10px] font-semibold" style={{ color: EVENT_META[event.type].color }}>{date.getMonth() + 1}月</p>
                    <p className="text-xl leading-none font-bold" style={{ color: EVENT_META[event.type].color }}>{date.getDate()}</p>
                    <p className="text-[10px] font-semibold" style={{ color: EVENT_META[event.type].color }}>{WEEKDAYS[date.getDay()]}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: EVENT_META[event.type].color }}>
                        {EVENT_META[event.type].label}
                      </span>
                      {!answered && <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "#FFF7ED", color: "#C2410C" }}>未回答</span>}
                    </div>
                    <p className="truncate text-sm font-bold text-gray-800">{event.title}</p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {event.startTime}〜{event.endTime}　{event.location}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-bold"
                      style={{
                        background: answered ? attendanceBg(record.status) : "#F3F4F6",
                        color: answered ? attendanceColor(record.status) : "#9CA3AF",
                      }}
                    >
                      {answered ? attendanceLabel(record.status) : "未定"}
                    </span>
                    <ChevronRightIcon className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
