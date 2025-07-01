/* eslint-disable no-console */

export function initConsoleCapture() {
  if (typeof window === "undefined") return
  if ((window as any).__consoleCaptureLoaded) return
  ;(window as any).__consoleCaptureLoaded = true

  const send = (level: string, args: unknown[]) => {
    fetch("/api/console-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level,
        args,
        stack: new Error().stack,
        ts: Date.now(),
      }),
    }).catch(() => {
      // Ignore errors, e.g., if the server is not available
    })
  }
  ;(["log", "warn", "error"] as const).forEach((level) => {
    const orig = console[level]
    console[level] = (...args: unknown[]) => {
      send(level, args)
      orig.apply(console, args)
    }
  })
}
