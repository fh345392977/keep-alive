/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestData } from '@ant-design/pro-table';
import { SortOrder } from 'antd/lib/table/interface';
import { ColumnMap, ColumnPropertyConfig, FormikItemConfigType } from './meta';
import { TableListBaseParams } from './pagination';

/**
 * 使用元数据获取表格表单配置的基类，主要为了ts提示
 */
export abstract class Base {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor,@typescript-eslint/no-empty-function
  constructor(data: any = {}) {}

  /**
   * 获取表格Columns
   * @param extra 用于覆盖默认值
   */
  static getColumns<T>(extra: ColumnMap<T> = new ColumnMap()): ColumnPropertyConfig<T>[] {
    return [];
  }

  /**
   * 获取指定属性的column配置
   * @param prop 指定列名
   */
  static getDesignatedColumn<T>(prop: Extract<keyof T, string>): ColumnPropertyConfig<T> {
    return {};
  }

  /**
   * 获取列表
   * @param api url地址
   */
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

  /**
   * 从指定对象获取表单值
   * @param item 指定对象
   */
  static getFormikInitValues<T>(item?: T): Partial<T> {
    return {};
  }

  /**
   * 获取表单配置
   * @param overwriteConfig 覆盖原配置
   */
  static getFormikItemConfig<T>(overwriteConfig?: { [key: string]: any }): FormikItemConfigType<T> {
    return {} as FormikItemConfigType<T>;
  }

  /**
   * 处理表单数据
   * @param item 原数据
   */
  static handleToFormData<T>(item: T) {}
}
