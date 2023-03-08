import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export const ScheduleForm = () => {
  const [seletedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  const handleClearSelectedDateTime = () => {
    setSelectedDateTime(null)
  }

  if (seletedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={seletedDateTime}
        onBackToCalendar={handleClearSelectedDateTime}
      />
    )
  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />
}
