"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Check, Sparkles, Crown, Gift } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  audioTitle?: string
}

export default function PaymentModal({ isOpen, onClose, audioTitle }: PaymentModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (planType: 'annual' | 'monthly') => {
    setIsLoading(true)
    try {
      // TODO: Integrar com Stripe
      console.log(`Assinando plano ${planType}`)
      // Simular redirecionamento para Stripe
      setTimeout(() => {
        alert(`Redirecionando para pagamento do plano ${planType}...`)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-slate-700">
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          
          {/* Header */}
          <DialogHeader className="relative p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-white">
                    Desbloqueie Todo o Conteúdo
                  </DialogTitle>
                  <DialogDescription className="text-slate-300">
                    {audioTitle ? `Para ouvir "${audioTitle}" e muito mais` : 'Acesso ilimitado a toda biblioteca'}
                  </DialogDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="relative px-6 pb-6">
            {/* Benefits */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">O que você ganha:</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Biblioteca completa',
                  'Downloads offline',
                  'Sem anúncios',
                  'Qualidade premium',
                  'Novos conteúdos',
                  'Suporte prioritário'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="space-y-3">
              {/* Annual Plan */}
              <Card 
                className={`relative cursor-pointer transition-all duration-200 border-2 ${
                  selectedPlan === 'annual' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
                onClick={() => setSelectedPlan('annual')}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <CardTitle className="text-white text-lg">Plano Anual</CardTitle>
                      </div>
                      <Badge className="bg-green-500 text-white text-xs flex items-center">
                        <Gift className="w-3 h-3 mr-1" />
                        50% OFF
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">R$ 7,00</div>
                      <div className="text-sm text-slate-400">por mês</div>
                    </div>
                  </div>
                  <CardDescription className="text-slate-300">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500 line-through">R$ 14,00/mês</span>
                      <Badge variant="secondary" className="text-xs">
                        30 dias grátis
                      </Badge>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm text-slate-400">
                    Cobrado R$ 84,00 anualmente após período gratuito
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Plan */}
              <Card 
                className={`relative cursor-pointer transition-all duration-200 border-2 ${
                  selectedPlan === 'monthly' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
                onClick={() => setSelectedPlan('monthly')}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-white text-lg">Plano Mensal</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">R$ 7,00</div>
                      <div className="text-sm text-slate-400">por mês</div>
                    </div>
                  </div>
                  <CardDescription className="text-slate-300">
                    Flexibilidade para cancelar quando quiser
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm text-slate-400">
                    Sem compromisso, cancele a qualquer momento
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <Button
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 text-lg rounded-xl"
              onClick={() => handleSubscribe(selectedPlan)}
              disabled={isLoading}
            >
              {isLoading ? (
                "Processando..."
              ) : selectedPlan === 'annual' ? (
                "Começar Teste Grátis de 30 Dias"
              ) : (
                "Assinar Agora"
              )}
            </Button>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">
                Pagamento seguro via Stripe • Cancele a qualquer momento
              </p>
              {selectedPlan === 'annual' && (
                <p className="text-xs text-slate-400 mt-1">
                  Após o período gratuito, será cobrado R$ 84,00/ano
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}