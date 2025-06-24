"use client" // Necessário para usePathname

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import BottomNav from "@/components/bottom-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { usePathname } from "next/navigation" // Importado
import PlayerProvider from "@/components/player/player-provider" // Importar PlayerProvider

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const showBottomNav = pathname !== "/" // Não mostrar BottomNav na tela de login (rota raiz)

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <main className={`flex-grow ${showBottomNav ? "pb-16" : ""}`}>{children}</main>
            {showBottomNav && <BottomNav />}
            <PlayerProvider /> {/* Adicionar PlayerProvider aqui para estar disponível em todas as telas */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
