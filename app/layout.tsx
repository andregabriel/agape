import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import "./globals.css" // CORREÇÃO: Movido para o topo do arquivo.

export const metadata: Metadata = {
  title: "Ágape",
  description: "Seu app de orações e meditações.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
