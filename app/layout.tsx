import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ágape - Orações e Meditações",
  description: "Seu app de orações e meditações católicas com áudios gerados por IA.",
  generator: "v0.dev",
  icons: {
    icon: "/images/agape-logo.svg",
    apple: "/images/agape-logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
