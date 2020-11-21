import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import React from 'react';

export default (props: RangePickerProps) => (
  <DatePicker.RangePicker
    {...props}
    ranges={{
      今天: [moment(), moment()],
    }}
  />
);
