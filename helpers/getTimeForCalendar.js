const date = new Date();

const getTimeForCalendar = () => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  day < 10 && (day = `0${day}`);
  month < 10 && (month = `0${month}`);

  return `${year}-${month}-${day}`;
};

export default getTimeForCalendar;
