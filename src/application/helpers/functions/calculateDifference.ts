export const calculateDifference = (start: Date, end: Date) => {
  const diffTime = Math.abs(end.getTime() - start.getTime());

  const timeValues = {
    minutes: Math.floor((diffTime / (1000 * 60)) % 60),
    hours: Math.floor((diffTime / (1000 * 60 * 60)) % 24)
  };

  const hours = timeValues.hours < 10 ? '0' + timeValues.hours : timeValues.hours;
  const minutes = timeValues.minutes < 10 ? '0' + timeValues.minutes : timeValues.minutes;
  const text = hours > 0 ? 'hour(s)' : 'minute(s)';

  return hours + ':' + minutes + ' ' + text;
};
