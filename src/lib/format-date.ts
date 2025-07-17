import config from '@/site.config'

const dateFormat = new Intl.DateTimeFormat(config.locale.dateLocale, config.locale.dateOptions)

export function getFormattedDate(
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions
) {
  if (typeof options !== 'undefined') {
    return new Date(date).toLocaleDateString(config.locale.dateLocale, {
      ...(config.locale.dateOptions as Intl.DateTimeFormatOptions),
      ...options
    })
  }

  return dateFormat.format(new Date(date))
}

export function createDateRange(
  fromDate?: Date,
  toDate?: Date,
  options?: Intl.DateTimeFormatOptions
) {
  if (!fromDate && !toDate) return null

  const formatter = (date: Date) => getFormattedDate(date, { day: undefined, ...options })

  if (fromDate && !toDate) return `${formatter(fromDate)} - Present`
  if (!fromDate && toDate) return formatter(toDate)
  if (fromDate && toDate) return `${formatter(fromDate)} - ${formatter(toDate)}`
  return null
}
