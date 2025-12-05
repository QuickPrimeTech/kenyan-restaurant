// Helper to clean up time string (14:00:00 -> 14:00)
export const formatTime = (timeStr: string) => {
  // timeStr is expected as "14:00:00"
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = Number(hourStr);
  const minute = Number(minuteStr);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 -> 12 and 13–23 -> 1–11

  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

// Helper to convert day numbers to day names
export const getDayNames = (day: string[]) => {
  const dayMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  return day.map((d) => dayMap[Number(d) as keyof typeof dayMap]).join(", ");
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr); // parses "2025-12-01"
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
