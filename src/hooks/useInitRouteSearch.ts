import { Store } from 'antd/es/form/interface';
import { useLocation } from 'umi';

export default (needReplace: boolean, defaultValues: Store | undefined): Store | undefined => {
  const location = useLocation();
  let initialValues = defaultValues;
  if (needReplace && !initialValues) {
    initialValues = {};
    const urlParams = new URLSearchParams(location.search.slice(1));
    urlParams.forEach((value, key) => {
      initialValues![key] = value;
    });
  }
  return initialValues;
};
