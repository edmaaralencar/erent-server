export const calculateDifferenceBetweenDates = (
  checkIn: string | Date,
  checkOut: string | Date,
) => {
  const t2 = new Date(checkOut).getTime()
  const t1 = new Date(checkIn).getTime()

  return (t2 - t1) / (24 * 3600 * 1000)
}

export const getDaysArray = (start: Date, end: Date) => {
  for (
    // eslint-disable-next-line no-var
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt))
  }

  return arr.map((date: Date) => {
    date.setHours(0, 0, 0, 0)

    return date.getTime()
  })
}
