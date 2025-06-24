import type React from "react"
import type { Metadata } from "next" // Metadata pode precisar ser ajustada ou removida se o layout for totalmente client-side
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "App de Orações",
  description: "Seu app de orações e meditações.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'
