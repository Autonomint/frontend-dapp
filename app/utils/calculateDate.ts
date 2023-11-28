const calculateDate = (): string => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Add 30 days in milliseconds

  const year = futureDate.getFullYear();
  const month = (futureDate.getMonth() + 1).toString().padStart(2, "0");
  const day = futureDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export default calculateDate;
