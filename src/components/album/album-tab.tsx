"use client";

import { useRef, useState } from "react";
import { useApp } from "@/components/app-state";
import { PlusIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui";
import { BRAND } from "@/lib/constants";
import type { PhotoCategory } from "@/lib/types";

const CATEGORIES = ["すべて", "練習", "試合", "イベント"] as const;

export function AlbumTab() {
  const { photos, addPhoto } = useApp();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("すべて");
  const inputRef = useRef<HTMLInputElement>(null);
  const displayed = category === "すべて" ? photos : photos.filter((photo) => photo.category === category);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const nextCategory: PhotoCategory = category === "すべて" ? "練習" : category;
    addPhoto({ url, caption: file.name.replace(/\.[^.]+$/, ""), category: nextCategory });
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <PageHeader title="写真アルバム" />
      <div className="flex gap-2 overflow-x-auto border-b border-gray-100 bg-white px-4 py-2.5">
        {CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className="shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all"
            style={category === item ? { background: BRAND, color: "white" } : { background: "#F3F4F6", color: "#6B7280" }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 lg:grid-cols-4 lg:gap-4 lg:p-6">
        {displayed.map((photo) => (
          <div key={photo.id} className="overflow-hidden rounded-xl bg-gray-100 shadow-sm">
            <img src={photo.url} alt={photo.caption} className="h-40 w-full object-cover" />
            <div className="px-2.5 py-2">
              <p className="truncate text-xs font-medium text-gray-700">{photo.caption}</p>
              <p className="mt-0.5 text-[10px] text-gray-400">{photo.category}</p>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-40 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 transition-colors hover:border-gray-300"
        >
          <PlusIcon className="h-6 w-6 text-gray-300" />
          <span className="text-xs text-gray-300">追加</span>
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => onFile(event.target.files?.[0])} />
      </div>
    </div>
  );
}
