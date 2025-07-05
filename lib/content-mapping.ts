// Mapeamento completo de TODOS os 69 thumbnails da página /home
// 1 áudio por thumbnail conforme solicitado
export interface ContentItem {
  id: string
  title: string
  subtitle?: string
  category: string
  voiceType: 'padre' | 'storytelling'
  estimatedDuration?: string
  priority: 'high' | 'medium' | 'low'
  contentType: 'audio' | 'playlist' | 'banner'
  prompt?: string // Prompt personalizado para OpenAI
}

export const ALL_CONTENT: ContentItem[] = [
  // SAGRADO CORAÇÃO DE JESUS - Banner (1 item)
  {
    id: "scj_banner",
    title: "Sagrado Coração de Jesus - Dia 6: 14 de junho",
    subtitle: "Challenge Banner Principal",
    category: "Sagrado Coração de Jesus",
    voiceType: "padre",
    estimatedDuration: "10 min",
    priority: "high",
    contentType: "banner",
    prompt: "Crie uma meditação sobre a devoção ao Sagrado Coração de Jesus, especificamente para o dia 6 da novena (14 de junho), incluindo orações e reflexões sobre o amor misericordioso de Cristo"
  },

  // CORPUS CHRISTI - Voz de Padre (4 itens)
  {
    id: "cc1",
    title: "Santo Ambrósio de Milão",
    subtitle: "Homilias Pai, Corpus Christi",
    category: "Corpus Christi",
    voiceType: "padre",
    estimatedDuration: "7-15 min",
    priority: "high",
    contentType: "audio",
    prompt: "Crie uma homilia profunda sobre Santo Ambrósio de Milão e sua devoção ao Corpus Christi, incluindo ensinamentos patrísticos sobre a Eucaristia"
  },
  {
    id: "cc2", 
    title: "Amor de Deus na Eucaristia",
    subtitle: "Livro II, Capítulo 2",
    category: "Corpus Christi",
    voiceType: "padre",
    estimatedDuration: "8-11 min",
    priority: "high",
    contentType: "audio",
    prompt: "Desenvolva uma meditação sobre o amor infinito de Deus presente na Sagrada Eucaristia, com base nos escritos dos santos"
  },
  {
    id: "cc3",
    title: "Comunhão Espiritual",
    subtitle: "Padre Pio em italiano",
    category: "Corpus Christi", 
    voiceType: "padre",
    estimatedDuration: "1 min",
    priority: "high",
    contentType: "audio",
    prompt: "Crie uma oração de comunhão espiritual no estilo de Padre Pio, curta mas profundamente emotiva"
  },
  {
    id: "cc4",
    title: "Adoração ao Santíssimo",
    subtitle: "Cantos e Orações",
    category: "Corpus Christi",
    voiceType: "padre",
    estimatedDuration: "60 min",
    priority: "medium", 
    contentType: "playlist",
    prompt: "Crie uma playlist completa de adoração eucarística com orações, meditações e momentos de silêncio contemplativo"
  },

  // CONTRA O VÍCIO - Banner (1 item)  
  {
    id: "cv_banner",
    title: "Contra o Vício - Dia 8: Santa Mônica",
    subtitle: "Novena Contra o Vício",
    category: "Contra o vício",
    voiceType: "padre",
    estimatedDuration: "15 min",
    priority: "high",
    contentType: "banner",
    prompt: "Desenvolva uma meditação sobre Santa Mônica como intercessora contra vícios, incluindo orações poderosas para libertação de dependências e fortalecimento espiritual"
  },

  // DESTAQUES - Voz de Padre (3 itens)
  {
    id: "hl1",
    title: "Novena para Namorados",
    subtitle: "com Joaquim e Ana",
    category: "Destaques",
    voiceType: "padre",
    estimatedDuration: "20 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Crie novena de 9 dias para namorados baseada na vida de Santos Joaquim e Ana, com orações para relacionamentos puros"
  },
  {
    id: "hl2", 
    title: "Novena para Casais",
    subtitle: "com Amanda e Marcelo",
    category: "Destaques",
    voiceType: "padre",
    estimatedDuration: "25 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Desenvolva novena para casais cristãos focada no fortalecimento do matrimônio através da oração conjunta"
  },
  {
    id: "hl3",
    title: "Novena para Filhos", 
    subtitle: "com Maria e José",
    category: "Destaques",
    voiceType: "padre",
    estimatedDuration: "18 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Crie novena para pais orarem por seus filhos, inspirada na Sagrada Família"
  },

  // ROTINAS MATINAIS - Voz de Padre (6 itens)
  {
    id: "mr1",
    title: "Terço Diário",
    subtitle: "Com os mistérios diários",
    category: "Rotinas Matinais",
    voiceType: "padre",
    estimatedDuration: "23-28 min",
    priority: "high",
    contentType: "audio",
    prompt: "Guie a oração completa do terço com meditações profundas sobre os mistérios, incluindo pausas contemplativas"
  },
  {
    id: "mr2",
    title: "Evangelho Diário",
    subtitle: "Lectio Divina Diária", 
    category: "Rotinas Matinais",
    voiceType: "padre",
    estimatedDuration: "5-30 min",
    priority: "high",
    contentType: "audio",
    prompt: "Conduza uma lectio divina matinal com reflexões sobre o Evangelho do dia, aplicação prática para a vida"
  },
  {
    id: "mr3",
    title: "Oferecimento da Manhã",
    subtitle: "Consagre seu dia a Deus",
    category: "Rotinas Matinais",
    voiceType: "padre", 
    estimatedDuration: "2 min",
    priority: "high",
    contentType: "audio",
    prompt: "Crie uma oração de oferecimento matinal curta mas poderosa para consagrar o dia inteiro a Deus"
  },
  {
    id: "mr4",
    title: "Desafio de Meditação",
    subtitle: "7 dias para uma mente serena",
    category: "Rotinas Matinais",
    voiceType: "padre",
    estimatedDuration: "10 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Desenvolva série de 7 meditações progressivas para cultivar paz interior e serenidade espiritual"
  },
  {
    id: "mr5",
    title: "Diário de Gratidão",
    subtitle: "Reflexões matinais",
    category: "Rotinas Matinais",
    voiceType: "padre",
    estimatedDuration: "5 min",
    priority: "medium",
    contentType: "audio",
    prompt: "Guie uma reflexão matinal sobre gratidão, encorajando reconhecimento das bênçãos divinas"
  },
  {
    id: "mr6",
    title: "Santo do Dia",
    subtitle: "Inspiração para sua jornada",
    category: "Rotinas Matinais",
    voiceType: "padre",
    estimatedDuration: "3 min",
    priority: "high",
    contentType: "audio",
    prompt: "Apresente brevemente um santo do dia com aplicação prática de suas virtudes para o cotidiano"
  },

  // FAVORITAS DOS ASSINANTES - Voz de Padre (3 itens)
  {
    id: "sf1",
    title: "Oração da Noite Completa",
    subtitle: "Com Juliano Cazarré",
    category: "Favoritas dos Assinantes",
    voiceType: "padre",
    estimatedDuration: "8-9 min",
    priority: "high",
    contentType: "audio",
    prompt: "Conduza uma oração noturna completa para encerrar o dia em paz, incluindo exame de consciência"
  },
  {
    id: "sf2",
    title: "Minuto de Inspiração Divina", 
    subtitle: "com Pe. Patrick Fernandes",
    category: "Favoritas dos Assinantes",
    voiceType: "padre",
    estimatedDuration: "3-6 min",
    priority: "high",
    contentType: "audio",
    prompt: "Ofereça uma reflexão espiritual breve mas impactante para inspirar o dia"
  },
  {
    id: "sf3",
    title: "Santo do Dia: Reflexões",
    subtitle: "Crer com a Igreja",
    category: "Favoritas dos Assinantes",
    voiceType: "padre",
    estimatedDuration: "4-8 min",
    priority: "high",
    contentType: "audio",
    prompt: "Desenvolva reflexão mais profunda sobre o santo do dia e sua relevância para nossa fé"
  },

  // TERMINE DE REZAR - Banner (1 item)
  {
    id: "tr_banner",
    title: "Termine de Rezar - Sagrado Coração de Jesus",
    subtitle: "Dia 6: 14 de junho",
    category: "Termine de Rezar",
    voiceType: "padre",
    estimatedDuration: "12 min",
    priority: "high",
    contentType: "banner",
    prompt: "Crie uma meditação de encerramento para quem está terminando a devoção ao Sagrado Coração, com oração final e compromisso espiritual"
  },

  // DIÁRIAS COM CONVIDADOS - Voz de Padre (3 itens)
  {
    id: "dg1",
    title: "Evangelho Diário Comentado",
    subtitle: "com Juliano Cazarré",
    category: "Diárias com Convidados",
    voiceType: "padre",
    estimatedDuration: "5-30 min",
    priority: "high",
    contentType: "audio",
    prompt: "Comente o Evangelho diário com linguagem acessível mas teologicamente sólida"
  },
  {
    id: "dg2",
    title: "Imitação Diária de Cristo",
    subtitle: "com Juliano Cazarré",
    category: "Diárias com Convidados",
    voiceType: "padre",
    estimatedDuration: "8-12 min",
    priority: "high",
    contentType: "audio",
    prompt: "Desenvolva meditação baseada na 'Imitação de Cristo' com aplicação prática para o dia"
  },
  {
    id: "dg3",
    title: "Terço Mariano em Família",
    subtitle: "com Família Lima",
    category: "Diárias com Convidados",
    voiceType: "padre",
    estimatedDuration: "24 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Guie um terço familiar com meditações adequadas para todas as idades"
  },

  // REFLITA SOBRE O EVANGELHO - Single Card (1 item)
  {
    id: "re_card",
    title: "Homilia Semanal",
    subtitle: "Pe. Pedro Willemsens",
    category: "Reflita sobre o Evangelho",
    voiceType: "padre",
    estimatedDuration: "15 min",
    priority: "high",
    contentType: "audio",
    prompt: "Desenvolva uma homilia semanal profunda e inspiradora sobre o Evangelho, com aplicação prática para a vida cristã"
  },

  // EXPLORE POR CATEGORIAS (3 itens)
  {
    id: "ec1",
    title: "Lofi Católico",
    subtitle: "Música para relaxar ou focar na fé",
    category: "Explore por Categorias",
    voiceType: "padre",
    estimatedDuration: "30 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Crie introdução e orientações para uso de música lofi católica durante oração e estudo"
  },
  {
    id: "ec2",
    title: "Áudios da Bíblia Sagrada",
    subtitle: "Caminhe pela Palavra de Deus",
    category: "Explore por Categorias",
    voiceType: "storytelling",
    estimatedDuration: "45 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Apresente seleção de passagens bíblicas narradas com introduções contextuais"
  },
  {
    id: "ec3",
    title: "Meditações Guiadas",
    subtitle: "Encontre paz interior",
    category: "Explore por Categorias",
    voiceType: "padre",
    estimatedDuration: "20 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Desenvolva série de meditações guiadas para encontrar paz interior através da oração contemplativa"
  },

  // ROTINAS NOTURNAS - Voz de Padre (3 itens)
  {
    id: "nr1",
    title: "Oração da Noite para Dormir",
    subtitle: "Com Juliano Cazarré",
    category: "Rotinas Noturnas",
    voiceType: "padre",
    estimatedDuration: "9 min",
    priority: "high",
    contentType: "audio",
    prompt: "Conduza uma oração noturna serena para preparar o coração para um sono tranquilo"
  },
  {
    id: "nr2",
    title: "Minuto Para Dormir em Paz",
    subtitle: "Orações Breves Para Descansar",
    category: "Rotinas Noturnas",
    voiceType: "padre",
    estimatedDuration: "1-2 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Crie série de orações muito breves para acalmar a mente antes de dormir"
  },
  {
    id: "nr3",
    title: "Pílulas de Sabedoria Noturna",
    subtitle: "Francisco Faus",
    category: "Rotinas Noturnas",
    voiceType: "padre",
    estimatedDuration: "16 min",
    priority: "medium",
    contentType: "audio",
    prompt: "Compartilhe reflexões de sabedoria espiritual para contemplação noturna"
  },

  // HISTÓRIAS BÍBLICAS PARA DORMIR - Voz de Storytelling (6 itens)
  {
    id: "bs1",
    title: "A Vocação de Moisés",
    subtitle: "Ex 2-6,13",
    category: "Histórias Bíblicas para Dormir",
    voiceType: "storytelling",
    estimatedDuration: "26 min",
    priority: "high",
    contentType: "audio",
    prompt: "Narre a história da vocação de Moisés de forma envolvente e contemplativa, ideal para reflexão noturna"
  },
  {
    id: "bs2",
    title: "Lázaro, Vem Para Fora",
    subtitle: "André Leite: Jo 10, 22-12",
    category: "Histórias Bíblicas para Dormir",
    voiceType: "storytelling",
    estimatedDuration: "22 min",
    priority: "high",
    contentType: "audio",
    prompt: "Conte dramaticamente a ressurreição de Lázaro, enfatizando o poder e compaixão de Jesus"
  },
  {
    id: "bs3",
    title: "A Anunciação",
    subtitle: "Lc 1, 26-38",
    category: "Histórias Bíblicas para Dormir",
    voiceType: "storytelling",
    estimatedDuration: "15 min",
    priority: "high",
    contentType: "audio",
    prompt: "Narre poeticamente a Anunciação, destacando a humildade e fé de Maria"
  },
  {
    id: "bs4",
    title: "O Filho Pródigo",
    subtitle: "Lc 15, 11-32",
    category: "Histórias Bíblicas para Dormir",
    voiceType: "storytelling",
    estimatedDuration: "18 min",
    priority: "high",
    contentType: "audio",
    prompt: "Conte emotivamente a parábola do filho pródigo, enfatizando o amor paternal de Deus"
  },
  {
    id: "bs5",
    title: "Jonas e a Baleia",
    subtitle: "Livro de Jonas",
    category: "Histórias Bíblicas para Dormir",
    voiceType: "storytelling",
    estimatedDuration: "20 min",
    priority: "medium",
    contentType: "audio",
    prompt: "Narre a aventura de Jonas com elementos dramáticos apropriados para todas as idades"
  },
  {
    id: "bs6",
    title: "Daniel na Cova dos Leões",
    subtitle: "Dn 6",
    category: "Histórias Bíblicas para Dormir",
    voiceType: "storytelling",
    estimatedDuration: "22 min",
    priority: "medium",
    contentType: "audio",
    prompt: "Conte corajosamente a história de Daniel, destacando a fidelidade a Deus em meio às perseguições"
  },

  // REZADAS RECENTEMENTE - Voz de Padre (3 itens)
  {
    id: "rp1",
    title: "Terço Diário Meditado",
    subtitle: "Com os mistérios do dia",
    category: "Rezadas Recentemente",
    voiceType: "padre",
    estimatedDuration: "28 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Guie terço completo com meditações profundas sobre os mistérios apropriados"
  },
  {
    id: "rp2",
    title: "Imitação de Cristo (Áudio)",
    subtitle: "com Juliano Cazarré",
    category: "Rezadas Recentemente",
    voiceType: "padre",
    estimatedDuration: "10 min",
    priority: "high",
    contentType: "audio",
    prompt: "Leia e comente trechos selecionados da 'Imitação de Cristo' com aplicação prática"
  },
  {
    id: "rp3",
    title: "Evangelho do Dia (Lectio)",
    subtitle: "Lectio Divina",
    category: "Rezadas Recentemente",
    voiceType: "padre",
    estimatedDuration: "12 min",
    priority: "high",
    contentType: "audio",
    prompt: "Conduza lectio divina completa com o evangelho do dia, incluindo todas as etapas contemplativas"
  },

  // MÚSICAS PARA DORMIR - Voz de Padre (3 itens)
  {
    id: "ms1",
    title: "Piano Para Dormir e Sonhar",
    subtitle: "Francesca LaRosa",
    category: "Músicas para Dormir",
    voiceType: "padre",
    estimatedDuration: "30 min",
    priority: "low",
    contentType: "playlist",
    prompt: "Crie meditações contemplativas para acompanhar música instrumental suave"
  },
  {
    id: "ms2",
    title: "Piano Relaxante Divino",
    subtitle: "Simon Wester",
    category: "Músicas para Dormir",
    voiceType: "padre",
    estimatedDuration: "25 min",
    priority: "low",
    contentType: "playlist",
    prompt: "Desenvolva reflexões espirituais relaxantes para música de piano contemplativa"
  },
  {
    id: "ms3",
    title: "Cantos Gregorianos Celestiais",
    subtitle: "Para meditar e dormir profundamente",
    category: "Músicas para Dormir",
    voiceType: "padre",
    estimatedDuration: "45 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Apresente cânticos gregorianos com breves introduções contemplativas"
  },

  // MINUTO DE HOMILIA - Single Card (1 item)
  {
    id: "mh_card",
    title: "Minuto de Homilia",
    subtitle: "Com Pe. Sérgio Jeremias",
    category: "Minuto de Homilia",
    voiceType: "padre",
    estimatedDuration: "2 min",
    priority: "high",
    contentType: "audio",
    prompt: "Desenvolva homilia breve mas profunda de 2 minutos com mensagem espiritual impactante"
  },

  // NOVO TESTAMENTO - Voz de Storytelling (6 itens)
  {
    id: "nt1",
    title: "Evangelho de São Mateus",
    subtitle: "Caminhe pela Vida de Jesus Cristo",
    category: "Novo Testamento",
    voiceType: "storytelling",
    estimatedDuration: "45 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Narre os principais episódios do Evangelho de Mateus de forma envolvente e educativa"
  },
  {
    id: "nt2",
    title: "Evangelho de São Marcos",
    subtitle: "Caminhe pela Vida de Jesus Cristo",
    category: "Novo Testamento",
    voiceType: "storytelling",
    estimatedDuration: "35 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Conte dinamicamente os episódios do Evangelho de Marcos, enfatizando a ação e os milagres"
  },
  {
    id: "nt3",
    title: "Evangelho de São Lucas",
    subtitle: "Caminhe pela Vida de Jesus Cristo",
    category: "Novo Testamento",
    voiceType: "storytelling",
    estimatedDuration: "50 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Narre poeticamente o Evangelho de Lucas, destacando a misericórdia e compaixão de Jesus"
  },
  {
    id: "nt4",
    title: "Evangelho de São João",
    subtitle: "Caminhe pela Vida de Jesus Cristo",
    category: "Novo Testamento",
    voiceType: "storytelling",
    estimatedDuration: "55 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Conte contemplativamente o Evangelho de João, enfatizando a divindade de Cristo"
  },
  {
    id: "nt5",
    title: "Atos dos Apóstolos",
    subtitle: "O início da Igreja",
    category: "Novo Testamento",
    voiceType: "storytelling",
    estimatedDuration: "60 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Narre empolgantemente o início da Igreja primitiva e as aventuras missionárias dos apóstolos"
  },
  {
    id: "nt6",
    title: "Apocalipse",
    subtitle: "Revelações de São João",
    category: "Novo Testamento",
    voiceType: "storytelling",
    estimatedDuration: "40 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Interprete simbolicamente as visões do Apocalipse de forma acessível e esperançosa"
  },

  // MÚSICA - Voz de Storytelling/Padre (3 itens)
  {
    id: "m1",
    title: "Tomé (Ao Vivo)",
    subtitle: "Davidson Silva",
    category: "Música",
    voiceType: "storytelling",
    estimatedDuration: "4 min",
    priority: "medium",
    contentType: "audio",
    prompt: "Apresente e comente esta música católica contemporânea com sua mensagem espiritual"
  },
  {
    id: "m2",
    title: "Sacred Heart Lofi Beats",
    subtitle: "Lofi católico para oração",
    category: "Música",
    voiceType: "padre",
    estimatedDuration: "20 min",
    priority: "low",
    contentType: "audio",
    prompt: "Introduza esta música ambiente para oração com sugestões de uso contemplativo"
  },
  {
    id: "m3",
    title: "#1 Playlist Lofi Cristã",
    subtitle: "Para rezar, estudar e meditar",
    category: "Música",
    voiceType: "padre",
    estimatedDuration: "30 min",
    priority: "low",
    contentType: "playlist",
    prompt: "Apresente seleção musical contemplativa com orientações para uso na oração"
  },

  // NÃO SABE POR ONDE COMEÇAR - Voz de Padre/Storytelling (6 itens)
  {
    id: "ws1",
    title: "Introdutório à Fé",
    subtitle: "Comece com o básico da doutrina",
    category: "Não sabe por onde começar",
    voiceType: "padre",
    estimatedDuration: "15 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Ensine os fundamentos da fé católica de forma simples e acolhedora para iniciantes"
  },
  {
    id: "ws2",
    title: "Como Rezar o Terço",
    subtitle: "Conheça o Poder da Oração Mariana",
    category: "Não sabe por onde começar",
    voiceType: "padre",
    estimatedDuration: "20 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Ensine passo a passo como rezar o terço, incluindo significado e meditação dos mistérios"
  },
  {
    id: "ws3",
    title: "Lectio Divina: Guia",
    subtitle: "Meditação da Palavra de Deus",
    category: "Não sabe por onde começar",
    voiceType: "padre",
    estimatedDuration: "12 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Guie iniciantes no método da Lectio Divina para aprofundar a meditação bíblica"
  },
  {
    id: "ws4",
    title: "O Credo Explicado",
    subtitle: "Entenda os artigos da nossa fé",
    category: "Não sabe por onde começar",
    voiceType: "padre",
    estimatedDuration: "25 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Explique cada artigo do Credo de forma didática e inspiradora"
  },
  {
    id: "ws5",
    title: "Os Sacramentos",
    subtitle: "Sinais visíveis da graça invisível",
    category: "Não sabe por onde começar",
    voiceType: "padre",
    estimatedDuration: "30 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Apresente cada sacramento católico com seu significado e importância espiritual"
  },
  {
    id: "ws6",
    title: "Vida dos Santos",
    subtitle: "Exemplos de fé e virtude",
    category: "Não sabe por onde começar",
    voiceType: "storytelling",
    estimatedDuration: "40 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Conte biografias inspiradoras de santos populares como modelos de vida cristã"
  },

  // TEMÁTICAS - Voz de Padre (3 itens)
  {
    id: "th1",
    title: "Paciência Divina",
    subtitle: "Espere com Deus e confie",
    category: "Temáticas",
    voiceType: "padre",
    estimatedDuration: "12 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Desenvolva meditações sobre a virtude da paciência com exemplos bíblicos e práticos"
  },
  {
    id: "th2",
    title: "Perdão e Misericórdia",
    subtitle: "Pai, perdoai-lhes, não sabem o que fazem",
    category: "Temáticas",
    voiceType: "padre",
    estimatedDuration: "15 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Explore profundamente o tema do perdão cristão e da misericórdia divina"
  },
  {
    id: "th3",
    title: "Esperança Cristã",
    subtitle: "A virtude que nos move",
    category: "Temáticas",
    voiceType: "padre",
    estimatedDuration: "10 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Inspire com reflexões sobre a esperança como virtude teologal fundamental"
  },

  // MAGISTERIUM - Banner (1 item)
  {
    id: "mg_banner",
    title: "Magisterium da Igreja",
    subtitle: "Ensinamentos do Magistério",
    category: "Magisterium",
    voiceType: "padre",
    estimatedDuration: "20 min",
    priority: "medium",
    contentType: "banner",
    prompt: "Desenvolva uma explicação sobre o Magistério da Igreja Católica, sua autoridade e importância para a fé"
  },

  // ORAÇÕES INFANTIS - Voz de Storytelling (6 itens)
  {
    id: "kp1",
    title: "Intro: Crianças na Fé",
    subtitle: "Agape Crianças",
    category: "Orações infantis",
    voiceType: "storytelling",
    estimatedDuration: "8 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Introduza conceitos de fé de forma lúdica e adequada para crianças"
  },
  {
    id: "kp2",
    title: "Orações em Família Unida",
    subtitle: "Para rezar junto com seus filhos",
    category: "Orações infantis",
    voiceType: "storytelling",
    estimatedDuration: "6 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Crie orações familiares interativas que envolvam crianças e pais"
  },
  {
    id: "kp3",
    title: "Anjinho da Guarda",
    subtitle: "Oração para crianças",
    category: "Orações infantis",
    voiceType: "storytelling",
    estimatedDuration: "1 min",
    priority: "high",
    contentType: "audio",
    prompt: "Ensine a oração do anjo da guarda de forma carinhosa e reconfortante para crianças"
  },
  {
    id: "kp4",
    title: "Histórias Bíblicas Infantis",
    subtitle: "Aventuras da Bíblia para os pequenos",
    category: "Orações infantis",
    voiceType: "storytelling",
    estimatedDuration: "25 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Conte histórias bíblicas adaptadas para crianças com linguagem simples e divertida"
  },
  {
    id: "kp5",
    title: "Músicas Católicas Infantis",
    subtitle: "Cante e louve com alegria",
    category: "Orações infantis",
    voiceType: "storytelling",
    estimatedDuration: "20 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Apresente cânticos católicos infantis com explicações do significado"
  },
  {
    id: "kp6",
    title: "Boa Noite, Jesus",
    subtitle: "Oração antes de dormir",
    category: "Orações infantis",
    voiceType: "storytelling",
    estimatedDuration: "2 min",
    priority: "high",
    contentType: "audio",
    prompt: "Crie uma oração noturna especial para crianças se despedirem de Jesus antes de dormir"
  },

  // NOVENAS - Voz de Padre (3 itens)
  {
    id: "nv1",
    title: "Novena de São José Operário",
    subtitle: "São José, rogai por nós e nossas famílias",
    category: "Novenas",
    voiceType: "padre",
    estimatedDuration: "20 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Conduza novena completa a São José como protetor dos trabalhadores e das famílias"
  },
  {
    id: "nv_scj",
    title: "Novena ao Sagrado Coração de Jesus",
    subtitle: "Eu confio em Vós, Senhor",
    category: "Novenas",
    voiceType: "padre",
    estimatedDuration: "25 min",
    priority: "high",
    contentType: "playlist",
    prompt: "Desenvolva novena ao Sagrado Coração com meditações sobre o amor e misericórdia de Jesus"
  },
  {
    id: "nv_smp",
    title: "Novena a Santa Maria Pura",
    subtitle: "Mãe admirável",
    category: "Novenas",
    voiceType: "padre",
    estimatedDuration: "18 min",
    priority: "medium",
    contentType: "playlist",
    prompt: "Crie novena mariana focada na pureza e virtudes de Nossa Senhora como modelo"
  }
]

// Estatísticas do conteúdo atualizado
export const CONTENT_STATS = {
  totalItems: ALL_CONTENT.length, // 69 itens
  byVoiceType: {
    padre: ALL_CONTENT.filter(item => item.voiceType === 'padre').length,
    storytelling: ALL_CONTENT.filter(item => item.voiceType === 'storytelling').length
  },
  byPriority: {
    high: ALL_CONTENT.filter(item => item.priority === 'high').length,
    medium: ALL_CONTENT.filter(item => item.priority === 'medium').length,
    low: ALL_CONTENT.filter(item => item.priority === 'low').length
  },
  byContentType: {
    audio: ALL_CONTENT.filter(item => item.contentType === 'audio').length,
    playlist: ALL_CONTENT.filter(item => item.contentType === 'playlist').length,
    banner: ALL_CONTENT.filter(item => item.contentType === 'banner').length
  },
  byCategory: ALL_CONTENT.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {} as Record<string, number>),
  estimatedTotalHours: ALL_CONTENT.reduce((total, item) => {
    // Converte duração estimada para minutos e soma
    const duration = item.estimatedDuration || "5 min"
    const minutes = parseInt(duration.split('-')[0]) || 5
    return total + minutes
  }, 0) / 60
}

// Função para obter conteúdo por filtros
export function getContentByFilters(filters: {
  voiceType?: 'padre' | 'storytelling'
  priority?: 'high' | 'medium' | 'low'
  category?: string
  contentType?: 'audio' | 'playlist' | 'banner'
}) {
  return ALL_CONTENT.filter(item => {
    if (filters.voiceType && item.voiceType !== filters.voiceType) return false
    if (filters.priority && item.priority !== filters.priority) return false
    if (filters.category && item.category !== filters.category) return false
    if (filters.contentType && item.contentType !== filters.contentType) return false
    return true
  })
}