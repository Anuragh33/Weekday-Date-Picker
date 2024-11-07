import { isWeekend } from './isWeekend'

export const getDatesInRange = (
  start: Date,
  end: Date
): { weekdays: Date[]; weekends: Date[] } => {
  const weekdays: Date[] = []
  const weekends: Date[] = []
  let currentDate = new Date(start)

  while (currentDate <= end) {
    const newDate = new Date(currentDate)
    if (isWeekend(newDate)) {
      weekends.push(newDate)
    } else {
      weekdays.push(newDate)
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return { weekdays, weekends }
}
