import "dayjs/locale/pt";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";

dayjs.locale("pt");
dayjs.extend(localizedFormat);

export { dayjs };
