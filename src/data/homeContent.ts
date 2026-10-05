import type { JourneyStep, TaskExample } from '../types/content'

export const journeySteps: JourneyStep[] = [
  { number: '01', title: 'O que é', headline: 'Você ajuda a treinar IA com tarefas reais.', description: 'A Hub paga pessoas para gravar atividades do dia a dia que ajudam no treinamento de sistemas de inteligência artificial.', note: 'Você registra tarefas reais acontecendo de verdade.' },
  { number: '02', title: 'Como funciona', headline: 'Você escolhe uma tarefa e segue as instruções.', description: 'Na Hub, você escolhe uma tarefa disponível, vê o que precisa ser feito, grava com o celular e envia pela plataforma.', note: 'Escolha, siga as instruções, grave e envie.' },
  { number: '03', title: 'Tipos de tarefa', headline: 'Tarefas em casa e no seu trabalho.', description: 'Existem tarefas para fazer em casa e outras que podem ser realizadas no seu trabalho.', note: 'Escolha as tarefas que combinam com a sua rotina.' },
  { number: '04', title: 'Grave a tarefa', headline: 'Filme suas mãos fazendo a tarefa.', description: 'Use o celular preso em um suporte de cabeça para gravar a atividade sendo realizada de verdade e siga as instruções da tarefa.', note: 'O foco é mostrar a execução da tarefa.' },
  { number: '05', title: 'Aguarde a aprovação', headline: 'Envie e aguarde a análise.', description: 'Depois do envio, a gravação é analisada para confirmar se a tarefa foi realizada corretamente.', note: 'A aprovação acontece antes do pagamento.' },
  { number: '06', title: 'Receba via Pix', headline: 'Receba em reais via Pix.', description: 'Depois que a tarefa é aprovada, o pagamento é feito via Pix dentro do prazo informado pela Hub.', note: 'Pagamento após aprovação.' },
]

export const taskExamples: TaskExample[] = [
  { id: 'video', title: 'Gravação de vídeo', description: 'Grave pequenos vídeos seguindo uma instrução da plataforma.', image: 'hero' },
  { id: 'foto', title: 'Tirar fotos', description: 'Fotografe objetos ou situações usando o celular.', image: 'task' },
  { id: 'voz', title: 'Gravar voz', description: 'Leia frases ou responda a perguntas em áudio.', image: 'voice' },
  { id: 'avaliacao', title: 'Avaliar produtos', description: 'Compare informações e valide detalhes do dia a dia.', image: 'review' },
]
