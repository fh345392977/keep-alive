/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProColumns } from '@ant-design/pro-table';
import { ColumnMap, FormikItemConfigType } from './meta';
import { TableListBaseParams, TableListData } from './pagination';

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

  static async getList<T>(params: TableListBaseParams): Promise<TableListData<T>> {
    return { total: 0, list: [] };
  }

  static getFormikInitValues<T>(item?: T): Partial<T> {
    return {};
  }

  static getFormikItemConfig<T>(overwriteConfig?: { [key: string]: any }): FormikItemConfigType<T> {
    return {} as FormikItemConfigType<T>;
  }

  static handleToFormData<T>(item: T) {}
}
