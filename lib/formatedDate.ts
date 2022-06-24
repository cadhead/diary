import dateFormat, { masks } from "dateformat";

masks.postedByDate = `"Posted by " dd/mm/yyyy, HH:MM:ss`;

export default function formatedDate(date?: number) {
  return dateFormat(date, "postedByDate");
}
