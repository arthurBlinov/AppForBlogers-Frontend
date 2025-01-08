import React from 'react'
import Moment from 'react-moment';
import { date } from 'yup/lib/locale';
const DateFormatter = () => {
  return (
    <Moment format="D MMM YYYY"withTitle>
        {date}
    </Moment>
  )
}

export default DateFormatter