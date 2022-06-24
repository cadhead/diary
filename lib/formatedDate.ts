import dateFormat, { masks } from "dateformat";

const format = 'dd/mm/yyyy, HH:MM:ss';

masks.postedByDate = `"Posted at " ${format}`;
masks.editAt = `"Last edit at " ${format}`

export default function formatedDate(date?: number, mask = "postedByDate") {
  return dateFormat(date, mask);
}
