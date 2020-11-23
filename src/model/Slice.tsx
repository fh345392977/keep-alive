import { Base } from '@/metadata/base';
import { Column, MetaEnhancedClass } from '@/metadata/utils';
import { getMomentDay, timeStringEnd, timeStringStart } from '@/utils/date';
import moment from 'moment';

@MetaEnhancedClass()
export default class Slice extends Base {
  static extraXcrollX = 200;

  id: number = 0;

  @Column({
    title: '切片名称',
    dataIndex: 'name',
    fixed: true,
    width: 150,
  })
  name: string = '';

  @Column({
    title: '病理号',
    dataIndex: 'pathology_number',
    width: 160,
  })
  pathology_number: string = '';

  @Column({
    title: '目录ID',
    dataIndex: 'directory_id',
    show: false,
    hideInForm: true,
    width: 100,
  })
  directory_id: string = '';

  @Column({
    title: '切片类型',
    dataIndex: 'category_id',
    show: false,
    width: 100,
  })
  category_id: string = '';

  @Column({
    title: '切片路径',
    dataIndex: 'path',
    width: 140,
  })
  path: string = '';

  @Column({
    title: 'md5值',
    dataIndex: 'md5',
    show: false,
    width: 100,
  })
  md5: string = '';

  @Column({
    title: '状态',
    dataIndex: 'status',
    width: 100,
  })
  status: number = 100;

  @Column({
    title: '医院名称',
    dataIndex: 'hospital_name',
    width: 150,
  })
  hospital_name: string = '';

  @Column({
    title: '标本类型',
    dataIndex: 'specimen_type',
    width: 100,
  })
  specimen_type: string = '';

  @Column({
    title: '标本部位',
    dataIndex: 'specimen_position',
    width: 120,
  })
  specimen_position: string = '';

  diagnostic_class: number = 0;

  @Column({
    title: '描述信息',
    dataIndex: 'description',
  })
  description: string = '';

  @Column({
    title: '标注数量',
    dataIndex: 'label_count',
    width: 120,
  })
  label_count: number = 0;

  @Column({
    title: '可用状态',
    dataIndex: 'disabled',
    width: 100,
  })
  disabled: number = 0;

  @Column({
    title: '临床信息',
    hideInForm: true,
    dataIndex: 'clinical_information',
    width: 200,
  })
  clinical_information: string = '';

  @Column({
    title: '训练/测试',
    dataIndex: 'training_or_test',
    width: 120,
    valueEnum: {
      0: {
        text: '未归类',
        status: 'Default',
      },
      1: {
        text: '训练集',
        status: 'Processing',
      },
      2: {
        text: '测试集',
        status: 'Success',
      },
    },
  })
  training_or_test: number = 0;

  @Column({
    title: '入库时间',
    dataIndex: 'created_at',
    width: 180,
    valueType: 'dateRange',
    fieldProps: {
      ranges: {
        今天: [moment(), moment()],
      },
    },
    search: {
      transform: (value: string[]) => {
        return {
          start_at: timeStringStart(value.first),
          end_at: timeStringEnd(value.first),
        };
      },
    },
    fromRoute: (value) => {
      return [getMomentDay(value?.start_at), getMomentDay(value?.end_at)];
    },
  })
  created_at: string = '';
}
