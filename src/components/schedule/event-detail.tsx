"use client";

import { AttendanceMemberList } from "@/components/attendance/attendance-member-list";
import { useApp } from "@/components/app-state";
import { ChevronLeftIcon } from "@/components/icons";
import { Card } from "@/components/ui";
import { ATTENDANCE_OPTIONS, BRAND, EVENT_META, attendanceLabel } from "@/lib/constants";
import { formatJapaneseDate } from "@/lib/format";
import type { AttendanceStatus, TeamEvent } from "@/lib/types";

export function EventDetail({ event, onBack }: { event: TeamEvent; onBack: () => void }) {
  const { attendance, updateAttendance, submitAttendance, reopenAttendance } = useApp();
  const record = attendance[event.id] ?? { status: "undecided" as const, comment: "", submitted: false };
  const meta = EVENT_META[event.type];

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <div className="flex items-center gap-3 px-4 py-3.5 lg:px-8" style={{ background: BRAND }}>
        <button type="button" onClick={onBack} className="text-white/80 transition-colors hover:text-white" aria-label="戻る">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="flex-1 text-base font-bold text-white">スケジュール詳細</h2>
      </div>

      <div className="space-y-4 px-4 pt-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0 lg:px-8">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="border-b border-gray-100 px-5 py-4" style={{ background: meta.bg }}>
              <span className="mb-3 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: meta.color }}>
                {meta.label}
              </span>
              <h3 className="text-xl leading-tight font-bold text-gray-900">{event.title}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { icon: "📅", label: "日時", value: `${formatJapaneseDate(event.date)}　${event.startTime}〜${event.endTime}` },
                { icon: "📍", label: "場所", value: event.location },
                ...(event.notes ? [{ icon: "📝", label: "備考", value: event.notes }] : []),
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3 px-5 py-3.5">
                  <span className="mt-0.5 shrink-0 text-base">{row.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">{row.label}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-800">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="hidden p-4 lg:block">
            <p className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">出欠状況</p>
            <AttendanceMemberList eventId={event.id} />
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <p className="mb-4 text-sm font-bold text-gray-800">出欠の回答</p>
            {record.submitted ? (
              <div className="py-6 text-center">
                <div className="mb-3 text-4xl">{record.status === "attending" ? "✅" : "❌"}</div>
                <p className="text-base font-bold text-gray-800">
                  {record.status === "attending" ? "参加で回答しました" : record.status === "absent" ? "欠席で回答しました" : `「${attendanceLabel(record.status)}」で回答しました`}
                </p>
                <p className="mt-1 text-xs text-gray-400">回答を変更する場合は下のボタンから</p>
                <button type="button" onClick={() => reopenAttendance(event.id)} className="mt-4 text-xs font-semibold underline" style={{ color: BRAND }}>
                  回答を変更する
                </button>
              </div>
            ) : (
              <AnswerForm
                status={record.status}
                comment={record.comment}
                onChange={(status, comment) => updateAttendance(event.id, status, comment)}
                onSubmit={() => submitAttendance(event.id)}
              />
            )}
          </Card>
          <Card className="p-4 lg:hidden">
            <p className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">出欠状況</p>
            <AttendanceMemberList eventId={event.id} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export function AnswerForm({
  status,
  comment,
  onChange,
  onSubmit,
}: {
  status: AttendanceStatus;
  comment: string;
  onChange: (status: AttendanceStatus, comment: string) => void;
  onSubmit: () => void;
}) {
  return (
    <>
      <div className="mb-4 space-y-2">
        {ATTENDANCE_OPTIONS.map((option) => {
          const active = status === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value, comment)}
              className="flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all"
              style={{ borderColor: active ? option.color : "#E5E7EB", background: active ? option.bg : "white" }}
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: active ? option.color : "#D1D5DB" }}>
                {active && <div className="h-2.5 w-2.5 rounded-full" style={{ background: option.color }} />}
              </div>
              <span className="flex-1 text-sm font-semibold text-gray-800">{option.label}</span>
              <span className="text-lg">{option.icon}</span>
            </button>
          );
        })}
      </div>
      <div className="mb-4">
        <p className="mb-1.5 text-xs font-bold text-gray-400">コメント（任意）</p>
        <textarea
          value={comment}
          onChange={(event) => onChange(status, event.target.value)}
          placeholder="遅刻・早退・その他連絡事項があれば入力してください"
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 px-3.5 py-3 text-sm outline-none transition-all focus:border-[#8B1A1A]"
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={status === "undecided"}
        className="w-full rounded-xl py-3.5 text-sm font-bold transition-all"
        style={{
          background: status === "undecided" ? "#E5E7EB" : BRAND,
          color: status === "undecided" ? "#9CA3AF" : "white",
          cursor: status === "undecided" ? "not-allowed" : "pointer",
        }}
      >
        回答を送信する
      </button>
    </>
  );
}
