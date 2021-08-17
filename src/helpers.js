function getFormattedDueDate(dbDate) {
  let date = new Date(dbDate);

  return `${getFormattedMonth(
    date.getMonth()
  )} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

let formattedMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getFormattedMonth(getMonth) {
  return formattedMonths[getMonth];
}

function findIndex({items, fn}) {
  return items.findIndex((t) => fn(t));
}

function findIndexWithId({items, item}) {
  return items.findIndex((i) => {
      return i.id === item.id;
  });
}

function getFormattedDate(string) {
  let date = new Date(string)

  return `${formattedMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export { getFormattedDueDate, findIndex, findIndexWithId, getFormattedDate};
