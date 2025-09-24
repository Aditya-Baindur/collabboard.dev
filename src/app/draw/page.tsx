'use client';

import dynamic from "next/dynamic";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then(m => m.Excalidraw),
  { ssr: false }
);

export default function DrawPage() {
  return (
    <div className="h-[80vh]">
      <Excalidraw />
    </div>
  );
}
