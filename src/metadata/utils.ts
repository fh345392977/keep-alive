import {
  ColumnPropertyConfig,
  CreateProperDecoratorF,
  FormItemConfigType,
  FormPropertyConfig,
  TypePropertyConfig,
} from '@/metadata/meta';
import { ProColumns } from '@ant-design/pro-table';
import { request } from 'umi';
import { TableListBaseParams, TableListData } from './pagination';

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
export const Type = typeConfig.properDecoratorF;
const columnConfig = CreateProperDecoratorF<ColumnPropertyConfig>();
export const Column = columnConfig.properDecoratorF;
const formItemConfig = CreateProperDecoratorF<FormPropertyConfig>();
export const FormItem = formItemConfig.properDecoratorF;

export function MetaEnhancedClass(): any {
  const cacheColumnConfigKey = Symbol('cacheColumnConfigKey');
  const cacheTypeConfigkey = Symbol('cacheTypeConfigkey');
  return function (Target: any) {
    return class EnhancedClass extends Target {
      [cacheColumnConfigKey]: Map<string, ColumnPropertyConfig> | null;

      /**
       * table column config
       */
      static get columnConfig(): Map<string, ColumnPropertyConfig> {
        return getConfigMap<ColumnPropertyConfig>(
          EnhancedClass,
          cacheColumnConfigKey,
          columnConfig.metaKey,
        );
      }

      /**
       * get table colums
       */
      static getColumns<T>(): ProColumns<T>[] {
        const list: ProColumns<T>[] = [];
        EnhancedClass.columnConfig.forEach((config, key) => {
          list.push({
            key,
            ...config,
          });
        });

        return list;
      }

      [cacheTypeConfigkey]: Map<string, FormPropertyConfig> | null;

      /**
       * table column config
       */
      static get formConfig(): Map<string, FormPropertyConfig> {
        return getConfigMap<FormPropertyConfig>(
          EnhancedClass,
          cacheTypeConfigkey,
          formItemConfig.metaKey,
        );
      }

      /**
       * get form init value
       */
      static getFormInitValues<T extends EnhancedClass>(item?: T): Partial<T> {
        const data: any = {};
        const _item = new EnhancedClass({});
        EnhancedClass.formConfig.forEach((config, key) => {
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

      static getFormItemConfig<T extends EnhancedClass>(overwriteConfig?: {
        [key: string]: any;
      }): FormItemConfigType<T> {
        const formConfig: any = {};
        EnhancedClass.formConfig.forEach((config, key) => {
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
        return formConfig as FormItemConfigType<T>;
      }

      static handleToFormData<T extends EnhancedClass>(item: T) {
        let data = {};
        EnhancedClass.formConfig.forEach((config, key) => {
          if (item.hasOwnProperty(key) && EnhancedClass.formConfig.get(key)) {
            data = {
              ...data,
              ...(EnhancedClass.formConfig.get(key)!.handleSubmitData
                ? EnhancedClass.formConfig.get(key)!.handleSubmitData!(item, key)
                : {
                    [key]: item[key] || '',
                  }),
            };
          }
        });
        return data;
      }

      static async getList<T>(api: string, params: TableListBaseParams): Promise<TableListData<T>> {
        const result = await request(api, { params });
        return {
          total: result.count,
          list: result.data.map((item: any) => new EnhancedClass(item)),
        };
      }

      constructor(data: any) {
        super(data);
        Object.keys(this).forEach((key) => {
          const config: TypePropertyConfig = Reflect.getMetadata(typeConfig.metaKey, this, key);
          console.log(config);
          if (config.handle) {
            if (typeof config.handle === 'string') {
              this[key] = data[config.handle];
            } else {
              this[key] = config.handle(data, key);
            }
          } else {
            this[key] = data[key];
          }
        });
      }
    };
  };
}
