import { AutoHeightProTableProps } from '@/components/AutoHeightProTable';

export function CustomTable<T>(props: AutoHeightProTableProps<T>): any {
  return function (Target: any) {
    return class EnhancedClass extends Target {
      static tableProps: AutoHeightProTableProps<T> = props;
    };
  };
}
