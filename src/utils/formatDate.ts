export function formatDate(date: string | undefined): string {
  if (!date) return 'N/A'

  const [year, month, day] = date.split('-').map(Number)
  const localDate = new Date(year, month - 1, day)

  return localDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}
