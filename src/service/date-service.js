export const formatDateTypeFull = (date, separator) => {
  const year = date.getFullYear(),
        month = formatDateNumber(date.getMonth()),
        day = formatDateNumber(date.getDate()),
        hours = formatDateNumber(date.getHours()),
        minutes = formatDateNumber(date.getMinutes());
  return year + separator + month + separator + day + ' ' +
         hours + ':' + minutes;
};

export const formatDateFull = (date) => {
  const leftPart = date.substring(0, 10),
        rightPart = date.substring(11, 19);
  return leftPart + ' ' + rightPart;
};

const formatDateNumber = number => number >= 10 ? number : '0' + number;
