function calculateTimeDifference(storedTime: string): string {
  if (!storedTime) {
    return "";
  }
  const storedTimeNumber = parseInt(storedTime);
  const currentTime = new Date().getTime();
  const difference = currentTime - storedTimeNumber;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let timeDiff = "";
  if (days > 0) {
    timeDiff = `${days} day(s) ago`;
  } else if (hours > 0) {
    timeDiff = `${hours} hour(s) ago`;
  } else if (minutes > 0) {
    timeDiff = `${minutes} minute(s) ago`;
  } else {
    timeDiff = `${seconds} second(s) ago`;
  }

  return timeDiff;
}
export default calculateTimeDifference;
