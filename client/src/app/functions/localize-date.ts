export const localizeDate = (date: string) => new Date(date)
  .toLocaleString('ru', { timeZone: 'Europe/Moscow' })

