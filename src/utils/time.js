export const convertTime = time => {
  const hours = parseInt(time.substring(0, 2), 10);
  const minutes = parseInt(time.substring(3, 5), 10);
  if (hours > 12) {
    return `${hours - 12}:${minutes} PM`;
  }

  return `${time} AM`;
};
