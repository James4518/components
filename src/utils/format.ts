import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const defaultDate = "YYYY-MM-DD HH:mm:ss";
export { defaultDate };
export function formatUTC(utcString: string, formatData: string = defaultDate) {
  return dayjs.utc(utcString).utcOffset(8).format(formatData);
}
