import type { Tutorial } from '../types/content'

export const tutorialCategories = ['Começando', 'Cadastro', 'Primeira tarefa', 'Ganhos', 'Saque', 'Problemas e soluções']

export const tutorials: Tutorial[] = [
  { id: 'guia-inicial', title: 'Antes de criar sua conta', category: 'Começando', platformSlug: 'nucleo-ai', duration: '04:18', thumbnailPosition: '70% center', image: 'hero' },
  { id: 'cadastro-seguro', title: 'Crie sua conta', category: 'Cadastro', platformSlug: 'sinal-studio', duration: '06:42', thumbnailPosition: '42% center', image: 'task' },
  { id: 'primeira-entrega', title: 'Faça a primeira tarefa', category: 'Primeira tarefa', platformSlug: 'campo-ia', duration: '05:10', thumbnailPosition: '52% center', image: 'hero' },
  { id: 'sacar-com-cuidado', title: 'Como sacar seus ganhos', category: 'Saque', platformSlug: 'nucleo-ai', duration: '03:56', thumbnailPosition: '70% center', image: 'task' },
  { id: 'resolver-pendencias', title: 'Quando uma tarefa volta', category: 'Problemas e soluções', platformSlug: 'fluxo-human', duration: '07:24', thumbnailPosition: '45% center', image: 'task' },
  { id: 'organizar-rotina', title: 'Organize sua rotina', category: 'Ganhos', platformSlug: 'sinal-studio', duration: '05:48', thumbnailPosition: '67% center', image: 'hero' },
]
