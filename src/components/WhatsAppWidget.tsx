"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Send, X } from "lucide-react";
import { WHATSAPP_OPTIONS } from "@/data/homepage";

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.004 4C9.383 4 4 9.382 4 16.003c0 2.382.697 4.706 2.01 6.685L4.7 27.3l4.762-1.249A11.96 11.96 0 0 0 16.004 28C22.625 28 28 22.623 28 16.003 28 9.382 22.625 4 16.004 4Zm6.993 16.86c-.292.82-1.693 1.564-2.345 1.66-.602.09-1.363.128-2.201-.138-.508-.162-1.158-.378-1.994-.739-3.51-1.514-5.8-5.04-5.974-5.272-.175-.233-1.425-1.894-1.425-3.612 0-1.718.902-2.561 1.221-2.91.32-.349.698-.436.93-.436.233 0 .466.003.67.013.215.01.503-.082.787.6.291.7 1.002 2.444 1.089 2.619.087.175.146.378.029.61-.116.233-.174.378-.349.582-.175.204-.367.456-.524.612-.175.174-.357.363-.154.712.204.35.908 1.498 1.95 2.427 1.341 1.196 2.473 1.566 2.823 1.74.349.175.553.146.757-.087.204-.233.873-1.018 1.106-1.367.233-.35.466-.291.786-.175.32.116 2.037.96 2.387 1.135.349.175.582.262.67.408.087.145.087.844-.204 1.664Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(WHATSAPP_OPTIONS[0].id);
  const [started, setStarted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    WHATSAPP_OPTIONS.find((opt) => opt.id === selectedId) ?? WHATSAPP_OPTIONS[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    setStarted(false);
  };

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed right-4 bottom-4 z-50 min-[769px]:right-6 min-[769px]:bottom-6"
    >
      <div
        role="dialog"
        aria-hidden={!open}
        aria-label="Konsultasi WhatsApp Nalar Digital"
        className={`absolute right-0 bottom-[70px] origin-bottom-right w-[328px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-brand-muted bg-white shadow-[0_24px_60px_rgba(37,41,67,0.22)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "pointer-events-auto visible opacity-100 scale-100 translate-y-0"
            : "pointer-events-none invisible opacity-0 scale-95 translate-y-3"
        }`}
      >
        <div className="flex items-center justify-between bg-[#25D366] px-4 py-3.5 text-white">
          <div>
            <p className="font-heading text-sm font-bold">
              Halo 👋 Ada yang bisa kami bantu?
            </p>
            <p className="text-[11px] text-white/90">
              Pilih topik untuk mulai konsultasi dengan Nalar Digital
            </p>
          </div>
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            aria-label="Close WhatsApp panel"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 touch-manipulation cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-3.5">
          {started ? (
            <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-4 text-left">
              <p className="font-heading text-sm font-bold text-[#166534]">
                Pesan konsultasi siap dikirim
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#15803D]">
                Topik terpilih:{" "}
                <span className="font-semibold">{selectedOption.label}</span>
              </p>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => setStarted(false)}
                className="mt-3 text-xs font-semibold text-[#166534] underline touch-manipulation cursor-pointer"
              >
                Pilih topik lain
              </button>
            </div>
          ) : (
            <div className="space-y-1.5">
              {WHATSAPP_OPTIONS.map((option) => {
                const isSelected = option.id === selectedId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => setSelectedId(option.id)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-colors touch-manipulation cursor-pointer ${
                      isSelected
                        ? "border-[#25D366] bg-[#F0FDF4] font-semibold text-brand-navy"
                        : "border-brand-muted bg-white text-[#454A66] hover:bg-brand-canvas"
                    }`}
                  >
                    <span>{option.label}</span>
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? "border-[#25D366] bg-[#25D366] text-white"
                          : "border-brand-muted"
                      }`}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => setStarted(true)}
            className="mt-3.5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 font-heading text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#1EBE5D] active:scale-[0.98] touch-manipulation cursor-pointer"
          >
            <Send className="h-4 w-4" />
            Chat dengan kami
          </button>
        </div>
      </div>

      <button
        type="button"
        aria-label={open ? "Close WhatsApp widget" : "Open WhatsApp widget"}
        aria-expanded={open}
        onClick={handleToggle}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.4)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-95 touch-manipulation cursor-pointer"
      >
        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-90" : "rotate-0"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <WhatsAppIcon />}
        </span>
      </button>
    </div>
  );
}
