import { useRequest } from 'ahooks';
import { request } from 'umi';

export interface TableCount {
  [key: string]: number;
}

export type onCountSuccessType = (data: TableCount) => void;
export interface TableCountOptionsProps {
  api?: string;
  onLoad?: onCountSuccessType;
  paramsFormatter?: (params: any) => any;
}
export default ({ api = '', onLoad: onSuccess, paramsFormatter }: TableCountOptionsProps = {}) => {
  const { run } = useRequest((params) => request(api, { params }), {
    manual: true,
    onSuccess: (result: any) => {
      if (onSuccess) {
        onSuccess(result);
      }
    },
  });
  const finalRun = (params: any) => {
    if (api) {
      run(paramsFormatter ? paramsFormatter(params) : params);
    }
  };
  return { run: finalRun };
};
