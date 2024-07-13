import { format } from "date-fns/format";
import { pt } from "date-fns/locale/pt";

export function displayDatesToRange(from: Date | string, to: Date | string) {
	return `${format(from, "d 'de' LLL", { locale: pt })} até ${format(to, "d 'de' LLL", { locale: pt })}`;
}
