const calculateNext30Days = (): string => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Add 30 days in milliseconds

  const year = futureDate.getFullYear();
  const month = (futureDate.getMonth() + 1).toString().padStart(2, "0");
  const day = futureDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
const calculate30DaysFromStoredTime = (storedTime: string): string => {
  const storedDate = new Date(parseInt(storedTime));
  const futureDate = new Date(storedDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Add 30 days in milliseconds

  const year = futureDate.getFullYear();
  const month = (futureDate.getMonth() + 1).toString().padStart(2, "0");
  const day = futureDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

function formatDateFromUnixTimestamp(unixTime: string): string {
  const depositDate = new Date(parseInt(unixTime));
  const year = depositDate.getFullYear();
  const month = depositDate.getMonth() + 1; // Month index starts from 0, so we add 1
  const day = depositDate.getDate();

  const formattedDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;
  return formattedDate;
}

export default calculateNext30Days;
export { calculate30DaysFromStoredTime, formatDateFromUnixTimestamp };
