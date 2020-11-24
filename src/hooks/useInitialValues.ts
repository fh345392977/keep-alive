import { ColumnPropertyConfig } from '@/metadata/meta';
import { Store } from 'antd/lib/form/interface';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// 不往表单赋值的项
const ignoreRouteQuery = ['page', 'page_size', 'current', 'pageSize'];
export default (
  needTransform: boolean,
  defaultValues: Store | undefined,
  columns: ColumnPropertyConfig[],
) => {
  const _initialValues = defaultValues ?? {};
  const location = useLocation();
  if (needTransform) {
    const urlParams = new URLSearchParams(location.search.slice(1));
    // 初步全盘赋值
    urlParams.forEach((value, key) => {
      if (!ignoreRouteQuery.contains(key)) {
        _initialValues![key] = value;
      }
    });
    columns.forEach((i) => {
      if (i.fromRoute && (i.fieldKey || typeof i.dataIndex === 'string')) {
        _initialValues![i.fieldKey ?? (i.dataIndex as string)] = i.fromRoute(urlParams);
      }
    });
  }
  const [initialValues] = useState(_initialValues);
  return initialValues;
};
