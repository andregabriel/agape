"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function AdminPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Falha ao gerar áudio.")
      }

      toast({
        title: "Sucesso!",
        description: `Áudio "${result.title}" gerado e salvo no Supabase.`,
      })
      setTitle("")
      setDescription("")
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Admin - Gerador de Áudio</h1>
          <p className="text-muted-foreground">Crie novas sessões de áudio usando IA para o roteiro e a narração.</p>
        </header>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Sessão</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Meditação sobre a Gratidão"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Breve Descrição (para o roteiro)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Uma meditação guiada de 5 minutos focada em encontrar alegria nas pequenas coisas e agradecer pelas bênçãos diárias."
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Gerando Áudio..." : "Gerar e Salvar Áudio"}
          </Button>
        </form>
      </div>
      <Toaster />
    </>
  )
}
