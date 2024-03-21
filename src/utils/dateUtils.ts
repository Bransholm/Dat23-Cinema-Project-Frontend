function formatDateForBackend(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  // const hours = ("0" + date.getHours()).slice(-2);
  // const minutes = ("0" + date.getMinutes()).slice(-2);
  // const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day}T00:00:00`;
}

function formatTimeForBackend(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
  return formattedTime;
}

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

function formatDateFromUSFormatToISO(date: string) {
  // Split the date string into day, month, and year components
  const dateString = date.split("-");
  const day = dateString[2];
  const month = dateString[1];
  const year = dateString[0];

  // Construct the ISO format date string "yyyy-mm-dd"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export { formatDateForBackend, formatTimeForBackend, formatDate, formatDateFromUSFormatToISO };
