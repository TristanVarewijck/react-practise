import { noteProps } from "../types";

export const differenceBetweenTimestamps = (timestamp: number): string => {
  const newDate = new Date(timestamp);
  const currentDate = new Date();
  const difference = currentDate.getTime() - newDate.getTime();
  const days = Math.floor(difference / (1000 * 3600 * 24));
  const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  if (days > 0) {
    return days + " days ago";
  } else if (hours > 0) {
    return hours + " hours ago";
  } else if (minutes > 0) {
    return minutes + " minutes ago";
  } else {
    return seconds + " seconds ago";
  }
}

export const formatTimestampToDateTime = (timestamp: number): string => {
  const newDate = new Date(timestamp);
  const formattedDate =
    ("0" + newDate.getDate()).slice(-2) +
    " / " +
    ("0" + (newDate.getMonth() + 1)).slice(-2) +
    " / " +
    newDate.getFullYear() +
    " " +
    ("0" + newDate.getHours()).slice(-2) +
    ":" +
    ("0" + newDate.getMinutes()).slice(-2);

  return formattedDate;
}

export const formatTimestampToHoursago = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = Math.floor((new Date().getTime() - date.getTime()) / 3600000);
  return hours > 0 ? `${hours} hours ago` : "Just now";
}

export const sortNotesByTimestamp = (notes: noteProps[]): noteProps[] => {
  return notes.sort((a, b) => b.date - a.date);
}












