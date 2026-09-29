type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: string
  copy?: string
  align?: 'start' | 'center'
}

export function SectionHeading({ index, eyebrow, title, copy, align = 'start' }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow"><span>{index}</span>{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  )
}
