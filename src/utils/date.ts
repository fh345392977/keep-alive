import moment from 'moment';

export const timeStringStart = (value: string) =>
  value ? moment(value).format('YYYY-MM-DD 00:00:00') : undefined;
export const timeStringEnd = (value: string) =>
  value ? moment(value).format('YYYY-MM-DD 23:59:59') : undefined;

export const getMomentDay = (value: string) =>
  value ? moment(value).format('YYYY-MM-DD') : undefined;
