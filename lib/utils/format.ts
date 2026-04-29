/* =========================================
   DATE
========================================= */

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(date))
}

/* =========================================
   NUMBERS
========================================= */

export function formatConfidence(value?: number | null) {
  if (!value && value !== 0) return '--'

  return `${Math.round(value)}%`
}

export function formatHeight(value?: number | null) {
  if (!value && value !== 0) return '--'

  return `${value} cm`
}

/* =========================================
   STRINGS
========================================= */

export function capitalize(value?: string | null) {
  if (!value) return ''

  return value.charAt(0).toUpperCase() + value.slice(1)
}

/* =========================================
   HEALTH
========================================= */

export function getHealthColor(score?: number | null) {
  if (!score) return 'text-gray-400'

  if (score >= 80) {
    return 'text-green-500'
  }

  if (score >= 50) {
    return 'text-yellow-500'
  }

  return 'text-red-500'
}

/* =========================================
   SEVERITY
========================================= */

export function getSeverityColor(severity?: string | null) {
  switch (severity) {
    case 'low':
      return 'text-green-500'

    case 'medium':
      return 'text-yellow-500'

    case 'high':
      return 'text-red-500'

    default:
      return 'text-foreground/60'
  }
}
