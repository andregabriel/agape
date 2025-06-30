"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const gettingStartedItems = [
  {
    id: "welcome",
    title: "Bem-vindo à Agape",
    content:
      "A Agape é uma comunidade vibrante e acolhedora, pronta para te receber de braços abertos. Explore os canais, participe das discussões e faça novos amigos!",
  },
  {
    id: "channels",
    title: "Explorando os Canais",
    content:
      "Nossos canais são organizados por temas. Use-os para encontrar informações, pedir ajuda ou simplesmente conversar sobre seus interesses.",
  },
  {
    id: "rules",
    title: "Regras da Comunidade",
    content:
      "Para garantir um ambiente saudável e respeitoso, temos algumas regras básicas. Leia-as com atenção e siga-as para contribuir para uma comunidade positiva.",
  },
  {
    id: "faq",
    title: "Perguntas Frequentes",
    content:
      "Tem alguma dúvida? Consulte nossa seção de Perguntas Frequentes para encontrar respostas rápidas e úteis.",
  },
]

export default function ComunidadePage() {
  const [email, setEmail] = useState("")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Comunidade Agape</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Começando</h2>
        <Accordion type="single" collapsible>
          {gettingStartedItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Recursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Anúncios</CardTitle>
              <CardDescription>Fique por dentro das últimas novidades e anúncios da comunidade.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Confira os anúncios mais recentes para não perder nenhuma informação importante.</p>
            </CardContent>
            <CardFooter>
              <Button>Ver Anúncios</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eventos</CardTitle>
              <CardDescription>Participe dos nossos eventos e atividades.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Confira a programação de eventos e participe para interagir com outros membros.</p>
            </CardContent>
            <CardFooter>
              <Button>Ver Eventos</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suporte</CardTitle>
              <CardDescription>Precisa de ajuda? Entre em contato com nossa equipe de suporte.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Se você tiver alguma dúvida ou problema, nossa equipe está pronta para te ajudar.</p>
            </CardContent>
            <CardFooter>
              <Button>Obter Suporte</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Membros Ativos</h2>
        <Table>
          <TableCaption>Lista de membros mais ativos da semana.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead>Atividade</TableHead>
              <TableHead>Pontos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">João Silva</TableCell>
              <TableCell>Participação em discussões</TableCell>
              <TableCell>120</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Maria Oliveira</TableCell>
              <TableCell>Criação de conteúdo</TableCell>
              <TableCell>150</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Pedro Santos</TableCell>
              <TableCell>Ajuda a novos membros</TableCell>
              <TableCell>100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Receba Novidades por Email</h2>
        <p className="mb-3">Inscreva-se para receber as últimas notícias e atualizações da comunidade.</p>
        <div className="flex items-center space-x-2">
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button>Inscrever-se</Button>
        </div>
      </section>
    </div>
  )
}
