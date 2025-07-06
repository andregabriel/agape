// Mapeamento de IDs para URLs de imagens geradas
export const imageMapping: Record<string, string> = {
  // Teste
  "teste_padre": "/images/home/thumbnails/teste-padre-oracao-matinal.png",
  "teste_storytelling": "/images/home/thumbnails/teste-storytelling-historia-biblica.png",
  
  // Corpus Christi
  "cc1": "/images/home/03-corpus-christi.png", // Já existe
  "cc2": "/images/home/thumbnails/amor-deus-eucaristia.png",
  "cc3": "/images/home/thumbnails/comunhao-espiritual.png",
  "cc4": "/images/home/thumbnails/adoracao-santissimo.png",
  
  // Destaques
  "hl1": "/images/home/thumbnails/novena-namorados.png",
  "hl2": "/images/home/thumbnails/novena-casais.png",
  "hl3": "/images/home/thumbnails/novena-filhos.png",
  
  // Favoritas dos Assinantes
  "sf1": "/images/home/thumbnails/oracao-noite-completa.png",
  "sf2": "/images/home/thumbnails/minuto-inspiracao-divina.png",
  "sf3": "/images/home/thumbnails/santo-dia-reflexoes.png",
  
  // Diárias com Convidados
  "dg1": "/images/home/thumbnails/evangelho-diario-comentado.png",
  "dg2": "/images/home/thumbnails/imitacao-diaria-cristo.png",
  "dg3": "/images/home/thumbnails/terco-mariano-familia.png",
  
  // Rotinas Noturnas
  "nr1": "/images/home/thumbnails/oracao-noite-dormir.png",
  "nr2": "/images/home/thumbnails/minuto-dormir-paz.png",
  "nr3": "/images/home/thumbnails/pilulas-sabedoria-noturna.png",
  
  // Rezadas Recentemente
  "rp1": "/images/home/thumbnails/terco-diario-meditado.png",
  "rp2": "/images/home/thumbnails/imitacao-cristo-audio.png",
  "rp3": "/images/home/thumbnails/evangelho-dia-lectio.png",
  
  // Músicas para Dormir
  "ms1": "/images/home/thumbnails/piano-dormir-sonhar.png",
  "ms2": "/images/home/thumbnails/piano-relaxante-divino.png",
  "ms3": "/images/home/thumbnails/cantos-gregorianos-celestiais.png",
  
  // Música
  "m1": "/images/home/thumbnails/tome-ao-vivo.png",
  "m2": "/images/home/thumbnails/sacred-heart-lofi.png",
  "m3": "/images/home/thumbnails/playlist-lofi-crista.png",
  
  // Temáticas
  "th1": "/images/home/thumbnails/paciencia-divina.png",
  "th2": "/images/home/thumbnails/perdao-misericordia.png",
  "th3": "/images/home/thumbnails/esperanca-crista.png",
  
  // Novenas
  "nv1": "/images/home/thumbnails/novena-sao-jose-operario.png",
  "nv_scj": "/images/home/thumbnails/novena-sagrado-coracao.png",
  "nv_smp": "/images/home/thumbnails/novena-santa-maria-pura.png",
  
  // Histórias Bíblicas para Dormir
  "bs1": "/images/home/thumbnails/vocacao-moises.png",
  "bs2": "/images/home/thumbnails/lazaro-vem-fora.png",
  "bs3": "/images/home/thumbnails/anunciacao.png",
  "bs4": "/images/home/thumbnails/filho-prodigo.png",
  "bs5": "/images/home/thumbnails/jonas-baleia.png",
  "bs6": "/images/home/thumbnails/daniel-cova-leoes.png",
  
  // Novo Testamento
  "nt1": "/images/home/thumbnails/evangelho-sao-mateus.png",
  "nt2": "/images/home/thumbnails/evangelho-sao-marcos.png",
  "nt3": "/images/home/thumbnails/evangelho-sao-lucas.png",
  "nt4": "/images/home/thumbnails/evangelho-sao-joao.png",
  "nt5": "/images/home/thumbnails/atos-apostolos.png",
  "nt6": "/images/home/thumbnails/apocalipse.png",
  
  // Não sabe por onde começar
  "ws1": "/images/home/thumbnails/introdutorio-fe.png",
  "ws2": "/images/home/thumbnails/como-rezar-terco.png",
  "ws3": "/images/home/thumbnails/lectio-divina-guia.png",
  "ws4": "/images/home/thumbnails/credo-explicado.png",
  "ws5": "/images/home/thumbnails/sacramentos.png",
  "ws6": "/images/home/thumbnails/vida-santos.png",
  
  // Rotinas Matinais
  "mr1": "/images/home/thumbnails/terco-diario.png",
  "mr2": "/images/home/thumbnails/evangelho-diario.png",
  "mr3": "/images/home/thumbnails/oferecimento-manha.png",
  "mr4": "/images/home/thumbnails/desafio-meditacao.png",
  "mr5": "/images/home/thumbnails/diario-gratidao.png",
  "mr6": "/images/home/thumbnails/santo-do-dia.png",
  
  // Orações infantis
  "kp1": "/images/home/thumbnails/intro-criancas-fe.png",
  "kp2": "/images/home/thumbnails/oracoes-familia-unida.png",
  "kp3": "/images/home/thumbnails/anjinho-guarda.png",
  "kp4": "/images/home/thumbnails/historias-biblicas-infantis.png",
  "kp5": "/images/home/thumbnails/musicas-catolicas-infantis.png",
  "kp6": "/images/home/thumbnails/boa-noite-jesus.png"
}

// Função para obter URL da imagem com fallback
export function getImageUrl(id: string, fallback?: string): string {
  return imageMapping[id] || fallback || "/placeholder.svg?width=300&height=400"
}