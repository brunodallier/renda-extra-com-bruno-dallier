import type { JourneyStep, TaskExample } from '../types/content'

export const journeySteps: JourneyStep[] = [
  { number: '01', title: 'O que é', headline: 'Tarefas que ajudam a melhorar IA.', description: 'Empresas precisam de pessoas para gravar, revisar, classificar e validar informações.', note: 'Você escolhe o que faz sentido para você.' },
  { number: '02', title: 'Como funciona', headline: 'Você segue uma instrução e envia.', description: 'Cada tarefa vem com regras claras. Faça o que foi pedido e envie para avaliação.', note: 'Qualidade importa mais que velocidade.' },
  { number: '03', title: 'Escolha uma plataforma', headline: 'Compare antes de criar a conta.', description: 'Veja como paga, o que pede e quais tarefas estão disponíveis.', note: 'Comece pela que combina com sua rotina.' },
  { number: '04', title: 'Faça as tarefas', headline: 'Celular, atenção e um bom briefing.', description: 'Pode ser vídeo, foto, voz, revisão ou validação de informações.', note: 'Leia tudo antes de enviar.' },
  { number: '05', title: 'Receba', headline: 'A tarefa aprovada vira saldo.', description: 'O formato de pagamento depende de cada plataforma e da tarefa.', note: 'Valores e prazos sempre precisam ser confirmados.' },
  { number: '06', title: 'Saque', headline: 'Confira a regra e peça seu pagamento.', description: 'Veja mínimo, método e prazo antes de solicitar o saque.', note: 'Tudo isso aparece na página de cada oportunidade.' },
]

export const taskExamples: TaskExample[] = [
  { id: 'video', title: 'Gravação de vídeo', description: 'Grave pequenos vídeos seguindo uma instrução da plataforma.', image: 'hero' },
  { id: 'foto', title: 'Tirar fotos', description: 'Fotografe objetos ou situações usando o celular.', image: 'task' },
  { id: 'voz', title: 'Gravar voz', description: 'Leia frases ou responda a perguntas em áudio.', image: 'voice' },
  { id: 'avaliacao', title: 'Avaliar produtos', description: 'Compare informações e valide detalhes do dia a dia.', image: 'review' },
]
