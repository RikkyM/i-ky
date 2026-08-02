import dayjs from "dayjs";

export const formatDuration = (
  start: string,
  end: string,
  locale: string = "en",
) => {
  return `${dayjs(start).locale(locale).format("MMM YYYY")} - ${dayjs(end).locale(locale).format("MMM YYYY")}`;
};
