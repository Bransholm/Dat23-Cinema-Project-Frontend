function formatDateForBackend(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function formatTimeForBackend(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
  return formattedTime;
}


export { formatDateForBackend, formatTimeForBackend };