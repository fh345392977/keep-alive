/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestData } from '@ant-design/pro-table';
import { SortOrder } from 'antd/lib/table/interface';
import { ColumnMap, ColumnPropertyConfig, FormikItemConfigType } from './meta';
import { TableListBaseParams } from './pagination';

/**
 * offer types
 */
export abstract class Base {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor,@typescript-eslint/no-empty-function
  constructor(data: any = {}) {}

  static extraXcrollX: number = 0;

  static getColumns<T>(extra: ColumnMap<T> = new ColumnMap()): ColumnPropertyConfig<T>[] {
    return [];
  }

  static getDesignatedColumn<T>(prop: Extract<keyof T, string>): ColumnPropertyConfig<T> {
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
