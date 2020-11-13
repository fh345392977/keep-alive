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

export type ServerHandle = (data: any, key: string) => any;

export interface TypePropertyConfig {
  handle?: string | ServerHandle;
}
export type ColumnPropertyConfig = Partial<ProColumns<any>>;
export interface FormPropertyConfig {
  validationSchema?: any;
  label?: string;
  handleSubmitData?: (data: any, key: string) => { [key: string]: any };
  required?: boolean;
  initValue?: any;
  options?: string[];
}

export type FormItemConfigType<T extends any> = {
  [key in keyof T]: {
    validationSchema?: any;
    handleSubmitData?: FormPropertyConfig['handleSubmitData'];
    form: {
      label: string;
      name: string;
      required: boolean;
      message?: string;
      options: string[];
    };
  };
};
