import { Filter } from 'lucide-react'
import type { FilterKey } from '../types/content'
import { filterOptions } from '../data/platforms'

type FilterBarProps = {
  activeFilter: FilterKey
  onChange: (filter: FilterKey) => void
}

export function FilterBar({ activeFilter, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar" aria-label="Filtros de plataformas">
      <span className="filter-label"><Filter size={16} />Filtrar por</span>
      <div className="filter-options" role="list">
        {filterOptions.map((filter) => (
          <button
            key={filter.key}
            type="button"
            className={activeFilter === filter.key ? 'is-selected' : ''}
            onClick={() => onChange(filter.key)}
            aria-pressed={activeFilter === filter.key}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
