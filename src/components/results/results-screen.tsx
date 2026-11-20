"use client";

import { useState } from "react";
import { useApp } from "@/components/app-state";
import { ChevronRightIcon } from "@/components/icons";
import { Card, PageHeader, TeamLogo } from "@/components/ui";
import { BRAND } from "@/lib/constants";
import { MATCH_RESULTS } from "@/lib/data";
import type { MatchResult } from "@/lib/types";

export function ResultsScreen() {
  const { closeSubScreen } = useApp();
  const [selected, setSelected] = useState<MatchResult | null>(null);

  if (selected) {
    const won = selected.myScore > selected.theirScore;
    const drew = selected.myScore === selected.theirScore;
    return (
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
        <PageHeader title="試合結果" onBack={() => setSelected(null)} />
        <div className="space-y-3 px-4 pt-4 lg:max-w-xl lg:px-8">
          <Card className="overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50 px-5 pt-5 pb-4">
              <p className="mb-3 text-center text-xs text-gray-500">{selected.date}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <div className="flex justify-center">
                    <TeamLogo size={40} />
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-gray-700">日の出キッカーズ</p>
                </div>
                <div className="px-4 text-center">
                  <div className="font-display text-5xl font-bold tracking-tight text-gray-900">
                    {selected.myScore} - {selected.theirScore}
                  </div>
                  <span className="mt-2 inline-block rounded px-3 py-0.5 text-xs font-bold text-white" style={{ background: won ? "#16A34A" : drew ? "#6B7280" : BRAND }}>
                    {won ? "WIN" : drew ? "DRAW" : "LOSE"}
                  </span>
                </div>
                <div className="flex-1 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-500">相手</div>
                  <p className="mt-1.5 text-xs font-semibold text-gray-700">{selected.opponent}</p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-gray-400">{selected.venue}</p>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="mb-2 text-xs font-bold text-gray-500">得点者</p>
                <div className="space-y-1.5">
                  {selected.scorers.map((scorer) => (
                    <div key={`${scorer.name}-${scorer.time}`} className="flex items-center gap-2">
                      <span className="text-sm">⚽</span>
                      <span className="text-sm font-semibold text-gray-800">{scorer.name}</span>
                      <span className="text-xs text-gray-400">（{scorer.time}）</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold text-gray-500">試合メモ</p>
                <p className="text-sm leading-relaxed text-gray-700">{selected.memo}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <PageHeader title="試合結果" onBack={closeSubScreen} />
      <div className="space-y-2 px-4 pt-4 lg:max-w-2xl lg:px-8">
        {MATCH_RESULTS.map((result) => {
          const won = result.myScore > result.theirScore;
          const drew = result.myScore === result.theirScore;
          return (
            <button key={result.id} type="button" onClick={() => setSelected(result)} className="w-full text-left">
              <Card className="flex items-center gap-3 px-4 py-4 transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: won ? "#16A34A" : drew ? "#6B7280" : BRAND }}>
                  {won ? "勝" : drew ? "分" : "負"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">vs. {result.opponent}</p>
                  <p className="text-xs text-gray-400">{result.date}</p>
                </div>
                <div className="font-display text-2xl font-bold text-gray-800">
                  {result.myScore}-{result.theirScore}
                </div>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-gray-400" />
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
