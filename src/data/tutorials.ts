import type { Tutorial } from '../types/content'

export const tutorials: Tutorial[] = [
  { id: 'hub-account', title: 'Como criar sua conta na Hub', category: 'Cadastro', platformSlug: 'nucleo-ai', duration: '', thumbnailPosition: 'center', image: 'hero', url: 'https://youtu.be/SQo0S4lg0LA' },
  { id: 'app-choice', title: 'Como escolher entre Minute e Hub Capture', category: 'Aplicativo', platformSlug: 'sinal-studio', duration: '', thumbnailPosition: 'center', image: 'task', url: 'https://youtu.be/0zgX8VfqqJM' },
  { id: 'install-app', title: 'Como instalar o aplicativo', category: 'Aplicativo', platformSlug: 'campo-ia', duration: '', thumbnailPosition: 'center', image: 'task', url: 'https://youtu.be/EzcFWjbeV6E' },
  { id: 'head-strap', title: 'Como usar o suporte de cabeça', category: 'Equipamento', platformSlug: 'fluxo-human', duration: '', thumbnailPosition: 'center', image: 'hero' },
  { id: 'find-tasks', title: 'Como encontrar tarefas', category: 'Primeira tarefa', platformSlug: 'nucleo-ai', duration: '', thumbnailPosition: 'center', image: 'task' },
  { id: 'first-recording', title: 'Como gravar sua primeira tarefa', category: 'Primeira tarefa', platformSlug: 'sinal-studio', duration: '', thumbnailPosition: 'center', image: 'hero' },
  { id: 'send-task', title: 'Como enviar a tarefa corretamente', category: 'Envio', platformSlug: 'campo-ia', duration: '', thumbnailPosition: 'center', image: 'task' },
  { id: 'pix', title: 'Como receber via Pix', category: 'Pagamento', platformSlug: 'fluxo-human', duration: '', thumbnailPosition: 'center', image: 'hero' },
]

export const homepageTutorials = tutorials.filter((tutorial) => Boolean(tutorial.url))
