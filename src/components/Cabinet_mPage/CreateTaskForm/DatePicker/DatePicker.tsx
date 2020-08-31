import React, {FC, useState} from "react";
import {DateRangeInput, FocusedInput} from "@datepicker-react/styled";

type PropsType = {
   setStartDate: (date: Date | null) => void
   setEndDate: (date: Date | null) => void
   startDate: Date | null
   endDate: Date | null
}

export const DatePicker: FC<PropsType> = ({setStartDate, setEndDate, startDate, endDate}) => {
   const [focusedInput, setFocusedInput] = useState(null as FocusedInput)

   return <DateRangeInput
      onDatesChange={
         (date) => {
            setStartDate(date.startDate)
            setEndDate(date.endDate)
         }}
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      startDate={startDate} // Date or null
      endDate={endDate} // Date or null
      focusedInput={focusedInput} // START_DATE, END_DATE or null
      vertical={true}
      placement={"top"}
      numberOfMonths={1}
      phrases={{
         close: "",
         datepickerEndDateLabel: "Конец кампаниии",
         datepickerEndDatePlaceholder: "ДД/ММ/ГГГГ",
         datepickerStartDateLabel: "Начало кампании",
         datepickerStartDatePlaceholder: "ДД/ММ/ГГГГ",
         endDateAriaLabel: "endDateAriaLabel",
         endDatePlaceholder: "Конец кампаниии",
         resetDates: "Сбросить",
         startDateAriaLabel: "Начало кампании",
         startDatePlaceholder: "Начало кампании",
      }}
   />
}
