export default function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedDate = `${month} ${day}, ${hours}:${paddedMinutes} ${ampm}`;
  return {
    date: `${month} ${day}`,
    time: `${hours}:${paddedMinutes} ${ampm}`,
    year: year,
  };
}
