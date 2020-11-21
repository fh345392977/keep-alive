/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProColumns, RequestData } from '@ant-design/pro-table';
import { SortOrder } from 'antd/lib/table/interface';
import { ColumnMap, FormikItemConfigType } from './meta';
import { TableListBaseParams } from './pagination';

type GetListProps<T> = (
  api: string,
) => (
  params: any & TableListBaseParams,
  sort: {
    [key: string]: SortOrder;
  },
  filter: {
    [key: string]: React.ReactText[];
  },
) => Promise<RequestData<T>>;

/**
 * offer types
 */
export abstract class Base {
  static extraXcrollX: number;

  static getColumns<T>(extra: ColumnMap<T> = new ColumnMap()): ProColumns<T>[] {
    return [];
  }

  static getDesignatedColumn<T>(prop: Extract<keyof T, string>): ProColumns<T> {
    return {};
  }

  static getList<T>(api: string) {
    return async (
      params: any & TableListBaseParams,
      sort: {
        [key: string]: SortOrder;
      },
      filter: {
        [key: string]: React.ReactText[];
      },
    ): Promise<RequestData<T>> => {
      return {
        data: [],
        total: 0,
      };
    };
  }

  static getFormikInitValues<T>(item?: T): Partial<T> {
    return {};
  }

  static getFormikItemConfig<T>(overwriteConfig?: { [key: string]: any }): FormikItemConfigType<T> {
    return {} as FormikItemConfigType<T>;
  }

  static handleToFormData<T>(item: T) {}
}
