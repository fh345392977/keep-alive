import {
  ColumnMap,
  ColumnPropertyConfig,
  CreateProperDecoratorF,
  FormikItemConfigType,
  FormikPropertyConfig,
  TypePropertyConfig,
} from '@/metadata/meta';
import { RequestData } from '@ant-design/pro-table';
import { request } from 'umi';
import * as Lodash from 'lodash';
import { SortOrder } from 'antd/lib/table/interface';
import { TableListBaseParams } from './pagination';

export interface ConstructableFunction {
  new (params?: any): ConstructableFunction;
}

function getConfigMap<T>(F: any, cachekey: symbol, metaKey: symbol): Map<string, T> {
  if (F[cachekey]) {
    return F[cachekey]!;
  }
  const item = new F({});
  // eslint-disable-next-line no-param-reassign
  F[cachekey] = Object.keys(item).reduce((pre, cur) => {
    const config: T = Reflect.getMetadata(metaKey, item, cur);
    if (config) {
      pre.set(cur, config);
    }
    return pre;
  }, new Map<string, T>());
  return F[cachekey];
}

const typeConfig = CreateProperDecoratorF<TypePropertyConfig>();
/**
 * 用于声明数据转换方式
 */
export const Type = typeConfig.properDecoratorF;

const columnConfig = CreateProperDecoratorF<ColumnPropertyConfig>();
/**
 * 用于声明该属性Column配置
 */
export const Column = columnConfig.properDecoratorF;

const formikItemConfig = CreateProperDecoratorF<FormikPropertyConfig>();
/**
 * 用于声明该属性的表单配置
 */
export const FormikItem = formikItemConfig.properDecoratorF;

export function MetaEnhancedClass(): any {
  const cacheColumnConfigKey = Symbol('cacheColumnConfigKey');
  const cacheFormikItemConfigkey = Symbol('cacheFormikItemConfigkey');
  return function (Target: any) {
    return class EnhancedClass extends Target {
      [cacheColumnConfigKey]: Map<string, ColumnPropertyConfig> | null;

      static get columnConfig(): Map<string, ColumnPropertyConfig> {
        return getConfigMap<ColumnPropertyConfig>(
          EnhancedClass,
          cacheColumnConfigKey,
          columnConfig.metaKey,
        );
      }

      static getDesignatedColumn<T>(prop: Extract<keyof T, string>): ColumnPropertyConfig<T> {
        return EnhancedClass.columnConfig.get(prop) as ColumnPropertyConfig<T>;
      }

      static getColumns<T>(extra: ColumnMap<T> = new ColumnMap()): ColumnPropertyConfig<T>[] {
        const list: ColumnPropertyConfig<T>[] = [];
        EnhancedClass.columnConfig.forEach((config, key) => {
          list.push({
            key,
            ...config,
            ...(extra.get(key as Extract<keyof T, string>) || {}),
          });
        });

        return list;
      }

      [cacheFormikItemConfigkey]: Map<string, FormikPropertyConfig> | null;

      /**
       * 表单 config
       */
      static get formikConfig(): Map<string, FormikPropertyConfig> {
        return getConfigMap<FormikPropertyConfig>(
          EnhancedClass,
          cacheFormikItemConfigkey,
          formikItemConfig.metaKey,
        );
      }

      /**
       * get form init value
       */
      static getFormikInitValues<T extends EnhancedClass>(item?: T): Partial<T> {
        const data: any = {};
        const _item = new EnhancedClass({});
        EnhancedClass.formikConfig.forEach((config, key) => {
          if (item && key in item) {
            data[key] = item[key];
          } else if ('initValue' in config) {
            data[key] = config.initValue;
          } else {
            data[key] = _item[key] || '';
          }
        });
        return data as Partial<T>;
      }

      static getFormikItemConfig<T extends EnhancedClass>(overwriteConfig?: {
        [key: string]: any;
      }): FormikItemConfigType<T> {
        const formConfig: any = {};
        EnhancedClass.formikConfig.forEach((config, key) => {
          formConfig[key] = {
            form: {
              label: String(config.label || key),
              name: String(key),
              required: !!config.validationSchema,
              options: config.options || [],
              ...overwriteConfig,
            },
          };
          if (config.validationSchema) {
            formConfig[key].validationSchema = config.validationSchema;
          }
          if (config.handleSubmitData) {
            formConfig[key].handleSubmitData = config.handleSubmitData;
          }
        });
        return formConfig as FormikItemConfigType<T>;
      }

      static handleToFormData<T extends EnhancedClass>(item: T) {
        let data = {};
        EnhancedClass.formikConfig.forEach((config, key) => {
          if (item.hasOwnProperty(key) && EnhancedClass.formikConfig.get(key)) {
            data = {
              ...data,
              ...(EnhancedClass.formikConfig.get(key)?.handleSubmitData
                ? EnhancedClass.formikConfig.get(key)!.handleSubmitData!(item, key)
                : {
                    [key]: item[key] || '',
                  }),
            };
          }
        });
        return data;
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
          let sort_by;
          let sort_way;
          const sorts = Object.keys(sort);
          if (sorts.length !== 0) {
            // eslint-disable-next-line prefer-destructuring
            sort_by = sorts[0];
            sort_way = sort[sorts[0]];
          }
          const finalParams = {
            ...params,
            page: params.current,
            page_size: params.pageSize,
            ...filter,
            sort_by,
            sort_way,
          };
          delete finalParams.current;
          delete finalParams.pageSize;
          const result = await request(api, {
            params: finalParams,
          });
          return {
            total: result.count,
            data: result.data.map((item: any) => new EnhancedClass(item)),
          };
        };
      }

      constructor(data: any) {
        super(data);
        Object.keys(this).forEach((key) => {
          const config: TypePropertyConfig = Reflect.getMetadata(typeConfig.metaKey, this, key);
          let finalValue: any;
          if (config) {
            if (config.handle) {
              if (typeof config.handle === 'string') {
                finalValue = Lodash.get(data, config.handle);
              } else {
                finalValue = config.handle(data, key);
              }
            }
          } else {
            finalValue = Lodash.get(data, key);
          }
          this[key] = finalValue ?? this[key];
        });
      }
    };
  };
}
