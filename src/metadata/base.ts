/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProColumns } from '@ant-design/pro-table';
import { ColumnMap, FormItemConfigType } from './meta';
import { TableListBaseParams, TableListData } from './pagination';

/**
 * offer types
 */
export abstract class Base {
  static getColumns<T>(extra: ColumnMap<T> = new ColumnMap()): ProColumns<T>[] {
    return [];
  }

  static getDesignatedColumns<T>(prop: Extract<keyof T, string>): ProColumns<T> {
    return {};
  }

  static async getList<T>(params: TableListBaseParams): Promise<TableListData<T>> {
    return { total: 0, list: [] };
  }

  static getFormInitValues<T>(item?: T): Partial<T> {
    return {};
  }

  static getFormItemConfig<T>(overwriteConfig?: { [key: string]: any }): FormItemConfigType<T> {
    return {} as FormItemConfigType<T>;
  }

  static handleToFormData<T>(item: T) {}
}
