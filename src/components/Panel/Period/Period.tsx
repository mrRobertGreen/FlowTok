import React, {useState} from "react"
import styles from "./styles.module.scss";
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar} from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

export const Period = () => {
   const [startDate, setStartDate] = useState()
   const [endDate, setEndDate] = useState()
   const [focus, setFocus] = useState();

   const handleFocusChange = (newFocus:any) => {
      setFocus(newFocus)
   };

   return (
      <div>
         <DateRangePickerCalendar
             startDate={startDate}
             endDate={endDate}
             focus={focus}
             onStartDateChange={setStartDate}
             onEndDateChange={setEndDate}
             onFocusChange={handleFocusChange}
             locale={enGB}
         />
      </div>
   )
}