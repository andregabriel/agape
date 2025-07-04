"use client"

import { Logtail } from "@logtail/browser"

/**
 * Initializes a client-side logger that captures console logs and errors
 * and sends them to Logtail. This should be called once when the app mounts.
 */
export function initializeLogger() {
  // Ensure this function only runs in the browser and only once.
  if (typeof window === "undefined" || (window as any).loggerInitialized) {
    return
  }

  // Use the source token you provided.
  const logtail = new Logtail("E6My3KgKfm3dyzZQ5pGkwdAV")

  // Keep a reference to the original console methods.
  const originalConsole = { ...console }

  // Override console methods to send logs to Logtail.
  console.log = (...args) => {
    originalConsole.log(...args)
    logtail.log(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(" "))
  }
  console.info = (...args) => {
    originalConsole.info(...args)
    logtail.info(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(" "))
  }
  console.warn = (...args) => {
    originalConsole.warn(...args)
    logtail.warn(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(" "))
  }
  console.error = (...args) => {
    originalConsole.error(...args)
    logtail.error(args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(" "))
  }

  // Global error handler for uncaught exceptions.
  window.onerror = (message, source, lineno, colno, error) => {
    const errorMessage = typeof message === "string" ? message : JSON.stringify(message)
    logtail.error(errorMessage, {
      source: `${source}:${lineno}:${colno}`,
      error: error ? JSON.stringify(error, Object.getOwnPropertyNames(error)) : "N/A",
    })
    // Also log to the original console if it exists.
    originalConsole.error(message, source, lineno, colno, error)
    return true // Prevents the default browser error handling.
  }

  // Global handler for unhandled promise rejections.
  window.onunhandledrejection = (event) => {
    logtail.error("Unhandled promise rejection", {
      reason: event.reason ? JSON.stringify(event.reason, Object.getOwnPropertyNames(event.reason)) : "N/A",
    })
    originalConsole.warn("Unhandled promise rejection", event.reason)
  }
  // Mark as initialized to prevent re-running.
  ;(window as any).loggerInitialized = true
  originalConsole.log("Frontend logger initialized.")
}
