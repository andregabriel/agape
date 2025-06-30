import Link from "next/link"

export default function TermosPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Termos de Serviço</h1>
        <div className="prose prose-lg text-gray-600 space-y-4">
          <p>
            Bem-vindo à Agape. Ao utilizar nosso aplicativo, você concorda com os seguintes termos e condições. Leia-os
            com atenção.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Uso do Aplicativo</h2>
          <p>
            Você concorda em usar o Hallow apenas para fins lícitos e de acordo com estes Termos. Você concorda em não
            usar o aplicativo de forma que possa desativar, sobrecarregar, danificar ou prejudicar o serviço.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Contas de Usuário</h2>
          <p>
            Para acessar alguns recursos, você pode ser solicitado a criar uma conta. Você é responsável por manter a
            confidencialidade de sua conta e senha e por restringir o acesso ao seu dispositivo.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Propriedade Intelectual</h2>
          <p>
            O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva da
            Agape e de seus licenciadores.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer
            momento. Se uma revisão for material, forneceremos um aviso com pelo menos 30 dias de antecedência antes que
            quaisquer novos termos entrem em vigor.
          </p>
          <p className="mt-8">Se tiver alguma dúvida sobre estes Termos, entre em contato conosco.</p>
          <div className="mt-8 border-t pt-6">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
              &larr; Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
