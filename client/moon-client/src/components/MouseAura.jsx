import { useEffect, useState } from "react";

export default function MouseAura() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[100] h-20 w-20 rounded-full border border-yellow-300/30 bg-yellow-300/10 blur-[1px] transition-transform duration-150 ease-out"
      style={{ transform: `translate(${pos.x - 40}px, ${pos.y - 40}px)` }}
    />
  );
}
