"use client";

import { useEffect } from "react";

/** 本番ビルドのときだけ Service Worker を登録します。開発中はキャッシュが邪魔になるためです。 */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* 登録に失敗してもアプリ本体は使えます */
    });
  }, []);

  return null;
}
