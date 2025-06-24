// Este componente é uma representação simplificada da ilustração.
// Para uma réplica exata, seria necessário um SVG complexo ou uma imagem.
export default function ConnectIllustration() {
  return (
    <div className="py-8 px-4 flex justify-around items-center">
      <div className="relative">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-400 rounded-tl-full rounded-tr-full rounded-br-full transform rotate-45"></div>
      </div>
      {/* Simulação do avião de papel */}
      <div className="text-purple-500 transform -rotate-[15deg] scale-150 mx-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="relative">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute -top-2 -left-2 w-5 h-5 bg-purple-400 rounded-tl-full rounded-tr-full rounded-bl-full transform -rotate-45"></div>
      </div>
    </div>
  )
}
