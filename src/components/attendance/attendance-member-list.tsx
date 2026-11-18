"use client";

import { useState } from "react";
import { MEMBERS, EVENT_ATTENDANCE } from "@/lib/data";
import { BRAND } from "@/lib/constants";
import type { AttendanceStatus } from "@/lib/types";

const GROUPS: { status: AttendanceStatus; label: string; color: string; bg: string }[] = [
  { status: "attending", label: "参加", color: "#16A34A", bg: "#F0FDF4" },
  { status: "absent", label: "欠席", color: BRAND, bg: "#FEF2F2" },
  { status: "undecided", label: "未回答", color: "#9CA3AF", bg: "#F9FAFB" },
];

export function AttendanceMemberList({ eventId }: { eventId: string }) {
  const [expanded, setExpanded] = useState<AttendanceStatus | null>(null);
  const data = EVENT_ATTENDANCE[eventId] ?? {};
  const membersOf = (status: AttendanceStatus) => MEMBERS.filter((member) => (data[member.id] ?? "undecided") === status);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {GROUPS.map((group) => {
          const count = membersOf(group.status).length;
          const isOpen = expanded === group.status;
          return (
            <button
              key={group.status}
              type="button"
              onClick={() => setExpanded(isOpen ? null : group.status)}
              className="flex-1 rounded-xl border-2 py-2.5 text-center transition-all"
              style={{
                background: isOpen ? group.color : group.bg,
                borderColor: isOpen ? group.color : "transparent",
              }}
            >
              <p className="text-xl font-bold" style={{ color: isOpen ? "white" : group.color }}>{count}</p>
              <p className="text-[10px] font-semibold" style={{ color: isOpen ? "white" : group.color }}>{group.label}</p>
            </button>
          );
        })}
      </div>

      {expanded && (
        <MemberRows status={expanded} members={membersOf(expanded)} />
      )}
    </div>
  );
}

function MemberRows({ status, members }: { status: AttendanceStatus; members: typeof MEMBERS }) {
  const group = GROUPS.find((item) => item.status === status)!;
  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: `${group.color}40` }}>
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: group.bg }}>
        <span className="text-xs font-bold" style={{ color: group.color }}>
          {group.label}（{members.length}名）
        </span>
      </div>
      <div className="divide-y divide-gray-100 bg-white">
        {members.length === 0 ? (
          <p className="px-4 py-3 text-xs text-gray-400">なし</p>
        ) : (
          members.map((member) => (
            <div key={member.id} className="flex items-center gap-3 px-4 py-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: group.color }}>
                {member.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-800">{member.name}</p>
                <p className="text-[10px] text-gray-400">（{member.childName} の保護者）</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
