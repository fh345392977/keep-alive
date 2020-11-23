import { ColumnPropertyConfig } from '@/metadata/meta';
import { ColumnsState } from '@ant-design/pro-table';
import { useState } from 'react';

export interface ColumnShow {
  [key: string]: ColumnsState;
}
export default <T>(
  columns: ColumnPropertyConfig<T>[] = [],
  key: string,
): [ColumnShow, (value: ColumnShow) => void] => {
  const tableColumnKey = `pro-table-column-${key}`;
  const storageColumnsState = window.localStorage.getItem(tableColumnKey);
  const defaultColumnState: ColumnShow = {};
  columns.forEach((i) => {
    if (i.show === false) {
      defaultColumnState[i.dataIndex!.toString()] = {
        show: false,
      };
    }
  });
  const initColumnShow: ColumnShow = storageColumnsState
    ? JSON.parse(storageColumnsState)
    : defaultColumnState;
  const [columnsStateMap, setColumnsStateMap] = useState<ColumnShow>(initColumnShow);
  const onColumnsStateChange = (columnState: ColumnShow) => {
    window.localStorage.setItem(tableColumnKey, JSON.stringify(columnState));
    setColumnsStateMap(columnState);
  };
  return [columnsStateMap, onColumnsStateChange];
};
