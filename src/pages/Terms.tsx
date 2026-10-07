import { termsIntro, termsSections } from '../data/legalContent'
import { LegalPage } from './LegalPage'

export function Terms() {
  return <LegalPage title="Termos de Uso | Renda Extra com Bruno Dallier" heading="Termos de Uso" description="Termos de Uso do Renda Extra com Bruno Dallier. Entenda regras, plataformas externas, links de indicação, tarefas, valores, pagamentos e limitações de responsabilidade." intro={termsIntro} sections={termsSections} />
}
