import React, { useState } from 'react'
import { isWeekend } from '../utils/isWeekend'
import { getDatesInRange } from '../utils/getDatesInRange'
import CalendarDays from './CalenderDays'

interface WeekdayDateRangePickerProps {
  predefinedRanges?: { label: string; range: [Date, Date] }[]
}

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  predefinedRanges,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear())
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth())
  const [weekendDates, setWeekendDates] = useState<Date[]>([])

  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const handleReset = () => {
    setStartDate(null)
    setEndDate(null)
    setDisplayYear(new Date().getFullYear())
    setDisplayMonth(new Date().getMonth())
    setWeekendDates([])
  }

  // Handler for date selection, filters out weekends
  const handleDateSelection = (date: Date) => {
    if (isWeekend(date)) return // Ignore if weekend

    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
      setWeekendDates([])
    } else if (startDate && !endDate && date >= startDate) {
      setEndDate(date)
      const { weekends } = getDatesInRange(startDate, date)
      setWeekendDates(weekends)
    }
  }

  // Month navigation
  const handleMonthChange = (increment: number) => {
    const newMonth = displayMonth + increment
    if (newMonth < 0) {
      setDisplayMonth(11)
      setDisplayYear(displayYear - 1)
    } else if (newMonth > 11) {
      setDisplayMonth(0)
      setDisplayYear(displayYear + 1)
    } else {
      setDisplayMonth(newMonth)
    }
  }

  // Predefined range selection
  const handlePredefinedRangeSelection = (range: [Date, Date]) => {
    setStartDate(range[0])
    setEndDate(range[1])
    const { weekends } = getDatesInRange(range[0], range[1])
    setWeekendDates(weekends)
  }

  return (
    <div>
      <h4 className="pb-10 text-2xl font-bold">Weekday Date Picker</h4>
      <div className="flex justify-center items-center">
        <button
          className="bg-emerald-600 text-sm text-slate-100  hover:bg-emerald-700 hover:border-none"
          onClick={() => handleMonthChange(-1)}
        >
          Prev Month
        </button>
        <span className="m-4 text-zinc-800 text-bold">
          {months[displayMonth]} {displayYear}
        </span>
        <button
          className="bg-emerald-600 text-sm text-slate-100 hover:bg-emerald-700 hover:border-none"
          onClick={() => handleMonthChange(1)}
        >
          Next Month
        </button>
        <span></span>
      </div>

      <CalendarDays //From Calender Days Component
        year={displayYear}
        month={displayMonth}
        startDate={startDate}
        endDate={endDate}
        onDateSelection={handleDateSelection}
      />
      <div className="pt-10">
        <h4 className="p-3 text-lg font-semibold">Predefined Ranges</h4>

        <div>
          {predefinedRanges?.map(({ label, range }) => (
            <button
              className="m-2 bg-emerald-600 text-slate-100  hover:bg-emerald-700 hover:border-none"
              key={label}
              onClick={() => handlePredefinedRangeSelection(range)}
            >
              {label}
            </button>
          ))}
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mx-8 rounded-full hover:border-none"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="mt-5">
        <h4 className="p-3 text-lg font-semibold">Selected Date Range</h4>
        <p className="text-md font-semibold ml-8 text-cyan-300">
          {startDate && endDate
            ? `${startDate.toISOString().split('T')[0]} to ${
                endDate.toISOString().split('T')[0]
              }`
            : 'No range selected'}
        </p>

        <h4 className="p-3 text-base font-semibold">Weekend Dates in Range</h4>
        <ul>
          {weekendDates.length > 0 ? (
            weekendDates.map((date) => (
              <li
                className="text-md ml-8 font-semibold text-red-400"
                key={date.toISOString()}
              >
                {date.toDateString().split(' 2024')[0]}
              </li>
            ))
          ) : (
            <p className="text-md ml-8 font-semibold text-red-400">
              No weekends in selected range
            </p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default WeekdayDateRangePicker
