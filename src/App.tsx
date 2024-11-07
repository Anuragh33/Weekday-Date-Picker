import WeekdayDateRangePicker from './components/WeekdayDatePickeer'

function App() {
  const predefinedRanges = [
    {
      label: 'Last 7 Days',
      range: [
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
      ] as [Date, Date],
    },
    {
      label: 'Last 30 Days',
      range: [
        new Date(new Date().setDate(new Date().getDate() - 30)),
        new Date(),
      ] as [Date, Date],
    },
  ]

  return (
    <div className=" flex justify-center items-center p-10 bg-grey-50 ">
      <WeekdayDateRangePicker predefinedRanges={predefinedRanges} />
    </div>
  )
}

export default App
