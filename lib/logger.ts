"use client"

/**
 * Initializes a client-side logger that apenas sobrescreve os métodos do console para manter logs locais.
 * Não envia logs para Logtail ou qualquer serviço externo.
 */
export function initializeLogger() {
  // Ensure this function only runs in the browser and only once.
  if (typeof window === "undefined" || (window as any).loggerInitialized) {
    return
  }

  // Keep a reference to the original console methods.
  const originalConsole = { ...console }

  // Override console methods to keep local logging only.
  console.log = (...args) => {
    originalConsole.log(...args)
  }
  console.info = (...args) => {
    originalConsole.info(...args)
  }
  console.warn = (...args) => {
    originalConsole.warn(...args)
  }
  console.error = (...args) => {
    originalConsole.error(...args)
  }

  // Global error handler for uncaught exceptions.
  window.onerror = (message, source, lineno, colno, error) => {
    originalConsole.error(message, source, lineno, colno, error)
    return true // Prevents the default browser error handling.
  }

  // Global handler for unhandled promise rejections.
  window.onunhandledrejection = (event) => {
    originalConsole.warn("Unhandled promise rejection", event.reason)
  }
  // Mark as initialized to prevent re-running.
  ;(window as any).loggerInitialized = true
  originalConsole.log("Frontend logger initialized (local only, no Logtail).")
}
