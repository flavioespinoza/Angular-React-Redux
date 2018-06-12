const log = require('ololog').configure({locate: false})

function day_of_week (date) {
  let weekday = ['Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday']

  return weekday[date.getDay()]

}

function formatDate (date) {
  let d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

function calculate_delivery_date (inputDate, holidays) {

  let transitionDays = 14
  let businessDays = 4
  let outForDeliveryDates = []

  for (let i = 1; i < transitionDays + 1; i++) {

    let nextDay = new Date(inputDate)

    nextDay.setDate(nextDay.getDate() + i)

    let day = day_of_week(nextDay)

    if (day !== 'Saturday') { // exclude Saturday
      if (day !== 'Sunday') { // exclude Sunday
        if (holidays.indexOf(formatDate(nextDay)) === -1) { // exclude holidays through 2020
          if (outForDeliveryDates.length < businessDays) { // businessDays = 4 
            outForDeliveryDates.push(formatDate(nextDay)) // dates out for delivery - last date is delivery date
          }
        }
      }
    }

  }

  return outForDeliveryDates[businessDays - 1] // last date is delivery date

}

let input_date = '06/01/2018'
// let delivery_date = calculate_delivery_date(input_date, holidays_through_2020())

// console.log(delivery_date) //=> 2018-06-14





function day_of_week (date) {
  let weekday = ['Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday']

  return weekday[date.getDay()]

}

function formatDate (date) {
  let d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

function calculate_business_days (inputDate, holidays) {

  Date.prototype.daysPerMonth = function () {
    let d = new Date(this.getFullYear(), this.getMonth() + 1, 0)
    return d.getDate()
  }

  let date = new Date(inputDate)
  let transitionDays = date.daysPerMonth()
  let businessDays = []

  for (let i = 1; i < transitionDays + 1; i++) {

    let nextDay = new Date(inputDate)
    nextDay.setDate(nextDay.getDate() + i)
    let day = day_of_week(nextDay)
    if (day !== 'Saturday') { // exclude Saturday
      if (day !== 'Sunday') { // exclude Sunday
        if (holidays.indexOf(formatDate(nextDay)) === -1) { // exclude holidays through 2020
          businessDays.push(nextDay)
        }
      }
    }

  }

  return businessDays // last date is delivery date

}

let start_of_month = '06/01/2018'
let business_days_june = calculate_business_days(start_of_month, holidays_through_2020())
console.log(business_days_june)


/** output in console.log()
 *
 [
 📅  Mon Jun 04 2018 00:00:00 GMT-0600 (MDT),
 📅  Tue Jun 05 2018 00:00:00 GMT-0600 (MDT),
 📅  Wed Jun 06 2018 00:00:00 GMT-0600 (MDT),
 📅  Thu Jun 07 2018 00:00:00 GMT-0600 (MDT),
 📅  Fri Jun 08 2018 00:00:00 GMT-0600 (MDT),
 📅  Mon Jun 11 2018 00:00:00 GMT-0600 (MDT),
 📅  Tue Jun 12 2018 00:00:00 GMT-0600 (MDT),
 📅  Wed Jun 13 2018 00:00:00 GMT-0600 (MDT),
 📅  Thu Jun 14 2018 00:00:00 GMT-0600 (MDT),
 📅  Fri Jun 15 2018 00:00:00 GMT-0600 (MDT),
 📅  Mon Jun 18 2018 00:00:00 GMT-0600 (MDT),
 📅  Tue Jun 19 2018 00:00:00 GMT-0600 (MDT),
 📅  Wed Jun 20 2018 00:00:00 GMT-0600 (MDT),
 📅  Thu Jun 21 2018 00:00:00 GMT-0600 (MDT),
 📅  Fri Jun 22 2018 00:00:00 GMT-0600 (MDT),
 📅  Mon Jun 25 2018 00:00:00 GMT-0600 (MDT),
 📅  Tue Jun 26 2018 00:00:00 GMT-0600 (MDT),
 📅  Wed Jun 27 2018 00:00:00 GMT-0600 (MDT),
 📅  Thu Jun 28 2018 00:00:00 GMT-0600 (MDT),
 📅  Fri Jun 29 2018 00:00:00 GMT-0600 (MDT)
 ]
 * */


// This can be changed to a REST call to a dates API
function holidays_through_2020 () {
  return [
    '2018-01-01',
    '2018-01-15',
    '2018-02-02',
    '2018-02-14',
    '2018-02-19',
    '2018-03-17',
    '2018-04-22',
    '2018-05-13',
    '2018-05-28',
    '2018-06-17',
    '2018-07-04',
    '2018-09-03',
    '2018-09-11',
    '2018-10-08',
    '2018-10-31',
    '2018-11-11',
    '2018-11-22',
    '2018-12-07',
    '2018-12-25',
    '2018-12-31',
    '2019-01-01',
    '2019-02-02',
    '2019-02-14',
    '2019-03-17',
    '2019-04-22',
    '2019-07-04',
    '2019-09-11',
    '2019-10-31',
    '2019-11-11',
    '2019-12-07',
    '2019-12-25',
    '2019-12-31',
    '2020-01-01',
    '2020-02-02',
    '2020-02-14',
    '2020-03-17',
    '2020-04-22',
    '2020-07-04',
    '2020-09-11',
    '2020-10-31',
    '2020-11-11',
    '2020-12-07',
    '2020-12-25',
    '2020-12-31'
  ]
}







