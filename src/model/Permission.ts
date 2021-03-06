import { Base } from '@/metadata/base';
import { Column, MetaEnhancedClass } from '@/metadata/utils';

@MetaEnhancedClass()
export default class Persmission extends Base {
  id: number = 0;

  @Column({
    title: '描述',
    dataIndex: 'description',
    fixed: true,
  })
  /**
   * 描述
   */
  description: string = '';

  @Column({
    title: 'Access',
    dataIndex: 'access',
    width: 100,
  })
  access: string = '';

  @Column({
    title: '模块',
    dataIndex: 'name',
    width: 100,
  })
  name: string = '';

  @Column({
    title: 'API',
    dataIndex: 'api',
    width: 200,
  })
  api: string = '';
}
