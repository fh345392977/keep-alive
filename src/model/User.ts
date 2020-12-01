import { Base } from '@/metadata/base';
import { Column, MetaEnhancedClass } from '@/metadata/utils';

@MetaEnhancedClass()
/**
 * 用户
 */
export default class User extends Base {
  @Column({
    dataIndex: 'name',
  })
  /**
   * 姓名
   */
  name: string = '';

  @Column({
    dataIndex: 'key',
  })
  /**
   * key
   */
  key: string = '';

  @Column({
    dataIndex: 'age',
  })
  /**
   * 年龄
   */
  age: number = 0;
}
