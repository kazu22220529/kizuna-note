"use client";

import { useState } from "react";
import { useApp } from "@/components/app-state";
import { Card, PageHeader, RedButton, fieldClassName } from "@/components/ui";
import { BRAND } from "@/lib/constants";

export function PostScreen() {
  const { closeSubScreen, publishNotice } = useApp();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("お知らせ");
  const [target, setTarget] = useState("全員");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!title.trim() || !body.trim()) {
      setError("タイトルと内容を入力してください");
      return;
    }
    const audience = target === "全員" ? "" : `\n（対象: ${target}）`;
    const attachment = fileName ? `\n添付: ${fileName}` : "";
    publishNotice({
      title: category === "重要" ? `【重要】${title.trim()}` : title.trim(),
      body: `${body.trim()}${audience}${attachment}`,
      important: category === "重要",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <PageHeader title="お知らせ投稿" onBack={closeSubScreen} />
      <div className="space-y-3 px-4 pt-4 lg:max-w-xl lg:px-8">
        <Card className="space-y-3 p-4">
          <div>
            <p className="mb-1.5 text-xs font-bold text-gray-500">タイトル</p>
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="例）練習時間変更のお知らせ" className={fieldClassName()} />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-bold text-gray-500">内容</p>
            <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="お知らせの内容を入力してください" rows={5} className={`${fieldClassName()} resize-none`} />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-bold text-gray-500">カテゴリ</p>
            <div className="flex gap-2">
              {["お知らせ", "重要", "その他"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className="rounded-lg px-4 py-2 text-xs font-bold"
                  style={category === item ? { background: BRAND, color: "white" } : { background: "#F3F4F6", color: "#6B7280" }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-bold text-gray-500">対象者</p>
            <div className="flex flex-wrap gap-3">
              {["全員", "特定の学年・保護者"].map((item) => (
                <button key={item} type="button" onClick={() => setTarget(item)} className="flex items-center gap-1.5 text-sm">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2" style={{ borderColor: target === item ? BRAND : "#D1D5DB" }}>
                    {target === item && <div className="h-2 w-2 rounded-full" style={{ background: BRAND }} />}
                  </div>
                  <span className={`text-xs font-medium ${target === item ? "text-gray-800" : "text-gray-400"}`}>{item}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-bold text-gray-500">添付ファイル（任意）</p>
            <label className="block w-full cursor-pointer rounded-xl border-2 border-dashed border-gray-200 py-3 text-center text-xs text-gray-400 transition-colors hover:border-gray-300">
              {fileName ? `📎 ${fileName}` : "📎 画像を選択"}
              <input type="file" accept="image/*" className="hidden" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} />
            </label>
          </div>
        </Card>
        {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        <RedButton onClick={submit}>投稿する</RedButton>
      </div>
    </div>
  );
}
