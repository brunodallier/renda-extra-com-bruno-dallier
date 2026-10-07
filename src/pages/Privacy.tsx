import { privacyIntro, privacySections } from '../data/legalContent'
import { LegalPage } from './LegalPage'

export function Privacy() {
  return <LegalPage title="Política de Privacidade | Renda Extra com Bruno Dallier" heading="Política de Privacidade" description="Política de Privacidade do Renda Extra com Bruno Dallier. Saiba como informações de navegação, cookies, links de indicação e plataformas externas podem ser tratados." intro={privacyIntro} sections={privacySections} />
}
