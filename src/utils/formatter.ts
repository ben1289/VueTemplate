import dayjs from 'dayjs'

export function formatDate(date: Date | number | string, template = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(template)
}
