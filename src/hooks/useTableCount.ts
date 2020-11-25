import { ListToolBarMenuItem } from '@ant-design/pro-table/lib/component/ListToolBar/HeaderMenu';
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
  menuFromRoute?: (params: any) => any;
  menus?: ListToolBarMenuItem[]; // 表格menus数组
  menuKey?: string; // menu 在接口中代表的参数
  defaultMenu?: string; // 默认tab
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
