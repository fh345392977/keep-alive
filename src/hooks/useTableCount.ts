import { useRequest } from 'ahooks';
import { request } from 'umi';

export interface TableCount {
  [key: string]: number;
}

export type onCountSuccessType = (data: TableCount) => void;
export interface TableCountOptionsProps<T> {
  api?: string;
  onSuccess?: onCountSuccessType;
  paramsFormatter?: (params: T) => any;
}
export default <T>({ api = '', onSuccess, paramsFormatter }: TableCountOptionsProps<T> = {}) => {
  const { run } = useRequest((params) => request(api, { params }), {
    manual: true,
    onSuccess: (result: any) => {
      if (onSuccess) {
        onSuccess(result);
      }
    },
  });
  const finalRun = (params: T) => {
    if (api) {
      run(paramsFormatter ? paramsFormatter(params) : params);
    }
  };
  return { run: finalRun };
};
