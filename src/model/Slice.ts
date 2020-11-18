import { Base } from '@/metadata/base';
import { Column, MetaEnhancedClass } from '@/metadata/utils';

@MetaEnhancedClass()
export default class Slice extends Base {
  id: number = 0;

  @Column({
    title: '切片名称',
    dataIndex: 'name',
  })
  name: String = '';

  @Column({
    title: '病理号',
    dataIndex: 'pathology_number',
  })
  pathology_number: String = '';

  @Column({
    title: '目录ID',
    dataIndex: 'directory_id',
    show: false,
    hideInForm: true,
  })
  directory_id: String = '';

  @Column({
    title: '切片类型',
    dataIndex: 'category_id',
    show: false,
  })
  category_id: String = '';

  @Column({
    title: '切片路径',
    dataIndex: 'path',
  })
  path: String = '';

  @Column({
    title: 'md5值',
    dataIndex: 'md5',
    show: false,
  })
  md5: String = '';
}
