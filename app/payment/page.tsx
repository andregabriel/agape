"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Heart, Music } from "lucide-react"
import Image from "next/image"

const features = [
  "Acesso ilimitado a todos os áudios",
  "Playlists personalizadas",
  "Download para ouvir offline",
  "Sem anúncios",
  "Conteúdo exclusivo",
  "Novos áudios semanalmente",
  "Suporte prioritário",
  "Sincronização entre dispositivos"
]

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual")

  const handleSubscribe = (planType: "monthly" | "annual") => {
    // Aqui você integraria com um sistema de pagamento real
    alert(`Redirecionando para pagamento ${planType === "annual" ? "anual" : "mensal"}...`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Crown className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Desbloqueie Todo o Conteúdo da Agape
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tenha acesso completo à nossa biblioteca espiritual com milhares de orações, 
            meditações e conteúdos exclusivos para fortalecer sua fé.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Monthly Plan */}
          <Card 
            className={`relative cursor-pointer transition-all duration-200 ${
              selectedPlan === "monthly" 
                ? "ring-2 ring-blue-500 shadow-lg" 
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Plano Mensal</CardTitle>
              <CardDescription>Flexibilidade total</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">R$ 19,90</span>
                <span className="text-gray-500">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full mb-4"
                variant={selectedPlan === "monthly" ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSubscribe("monthly")
                }}
              >
                Assinar Mensalmente
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Cancele a qualquer momento
              </p>
            </CardContent>
          </Card>

          {/* Annual Plan */}
          <Card 
            className={`relative cursor-pointer transition-all duration-200 ${
              selectedPlan === "annual" 
                ? "ring-2 ring-green-500 shadow-lg" 
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedPlan("annual")}
          >
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
              🔥 50% DE DESCONTO
            </Badge>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-xl">Plano Anual</CardTitle>
              <CardDescription>Melhor custo-benefício</CardDescription>
              <div className="mt-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg text-gray-400 line-through">R$ 238,80</span>
                  <span className="text-3xl font-bold text-green-600">R$ 119,40</span>
                </div>
                <span className="text-gray-500">/ano</span>
                <p className="text-sm text-green-600 mt-1">
                  Equivale a R$ 9,95/mês
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full mb-4 bg-green-600 hover:bg-green-700"
                variant={selectedPlan === "annual" ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSubscribe("annual")
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Assinar Anualmente
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Economia de R$ 119,40 por ano
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features List */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              O que você terá acesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Testimonial */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Maria Silva</p>
                <p className="text-sm text-gray-600">Usuária Premium há 2 anos</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "A Agape transformou minha vida espiritual. Tenho acesso a centenas de orações e 
              meditações que me acompanham todos os dias. Vale cada centavo!"
            </p>
          </CardContent>
        </Card>

        {/* Money Back Guarantee */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4" />
            <span className="font-medium">Garantia de 7 dias ou seu dinheiro de volta</span>
          </div>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Posso cancelar a qualquer momento?
              </h4>
              <p className="text-gray-600 text-sm">
                Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                O que acontece se eu cancelar?
              </h4>
              <p className="text-gray-600 text-sm">
                Você continuará tendo acesso até o final do período pago, depois voltará ao plano gratuito.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Posso usar em vários dispositivos?
              </h4>
              <p className="text-gray-600 text-sm">
                Sim, sua assinatura permite acesso em todos os seus dispositivos com sincronização automática.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}