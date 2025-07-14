import { theme } from '@/site.config'

export const formatProjectDate = (date: Date) => {
  return date.toLocaleDateString(theme.locale.dateLocale, theme.locale.dateOptions)
}

export const formatProjectDateLong = (date: Date) => {
  return date.toLocaleDateString(theme.locale.dateLocale, {
    ...theme.locale.dateOptions,
    month: 'long'
  })
}

export const getProjectDateRange = (fromDate?: Date, toDate?: Date) => {
  if (!fromDate && !toDate) return null
  if (fromDate && !toDate) return `${formatProjectDate(fromDate)} - Present`
  if (!fromDate && toDate) return formatProjectDate(toDate)
  if (fromDate && toDate) return `${formatProjectDate(fromDate)} - ${formatProjectDate(toDate)}`
  return null
}

export const getProjectDateRangeLong = (fromDate?: Date, toDate?: Date) => {
  if (!fromDate && !toDate) return null
  if (fromDate && !toDate) return `${formatProjectDateLong(fromDate)} - Present`
  if (!fromDate && toDate) return formatProjectDateLong(toDate)
  if (fromDate && toDate)
    return `${formatProjectDateLong(fromDate)} - ${formatProjectDateLong(toDate)}`
  return null
}
