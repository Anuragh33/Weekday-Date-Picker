import React from 'react'
import { isWeekend } from '../utils/isWeekend'

interface CalendarDaysProps {
  year: number
  month: number
  startDate: Date | null
  endDate: Date | null
  onDateSelection: (date: Date) => void
}

const CalendarDays: React.FC<CalendarDaysProps> = ({
  year,
  month,
  startDate,
  endDate,
  onDateSelection,
}) => {
  const generateDays = () => {
    const days: JSX.Element[] = []
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    //console.log(firstDayOfMonth)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    //console.log(`days in month: ${daysInMonth}`)

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div />)
    }

    // Add day cells for the days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i) //Gives the dates of days in the selected month
      //console.log(dayDate)

      const isInRange =
        startDate && endDate && dayDate >= startDate && dayDate <= endDate
      console.log(isInRange)

      days.push(
        <button
          key={i}
          disabled={isWeekend(dayDate)}
          onClick={() => onDateSelection(dayDate)}
          className={`m-2 p-2   ${
            isWeekend(dayDate)
              ? `text-slate-100 border-slate-600  `
              : `text-slate-800  hover:bg-stone-700 hover:text-slate-200 border-slate-600 hover:border-none `
          } ${
            isInRange
              ? `bg-blue-300 text-black`
              : isWeekend(dayDate)
              ? `bg-red-500`
              : `bg-slate-50`
          }
            } `}
        >
          {i}
        </button>
      )
    }

    return days
  }

  return (
    <div className="grid gap-2 grid-cols-7 mt-5">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {day}
        </div>
      ))}
      {generateDays()}
    </div>
  )
}

export default CalendarDays
