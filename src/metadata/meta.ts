import { ProColumns } from '@ant-design/pro-table';

export function CreateProperDecoratorF<T>() {
  const metaKey = Symbol('metaKey');
  function properDecoratorF(config: T): PropertyDecorator {
    return function (target, key) {
      Reflect.defineMetadata(metaKey, config, target, key);
    };
  }
  return { metaKey, properDecoratorF };
}

type ServerHandle = (data: any, key: string) => any;

export interface TypePropertyConfig {
  handle?: string | ServerHandle;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type CustomColumnPropertyConfig<T = any> = {
  // 列默认是否显示，如需默认隐藏，请设置为false
  show: boolean;
};
export type ColumnPropertyConfig<T = any> = Partial<ProColumns<T> & CustomColumnPropertyConfig<T>>;

export class ColumnMap<T> extends Map<Extract<keyof T, string>, Partial<ProColumns<T>>> {}

export interface FormikPropertyConfig {
  validationSchema?: any;
  label?: string;
  handleSubmitData?: (data: any, key: string) => { [key: string]: any };
  required?: boolean;
  initValue?: any;
  options?: string[];
}

export type FormikItemConfigType<T extends any> = {
  [key in keyof T]: {
    validationSchema?: any;
    handleSubmitData?: FormikPropertyConfig['handleSubmitData'];
    form: {
      label: string;
      name: string;
      required: boolean;
      message?: string;
      options: string[];
    };
  };
};
