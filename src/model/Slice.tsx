import { Base } from '@/metadata/base';
import { Column, MetaEnhancedClass } from '@/metadata/utils';
import { getMoment, timeStringEnd, timeStringStart } from '@/utils/date';
import moment from 'moment';

@MetaEnhancedClass()
/**
 * 切片
 */
export default class Slice extends Base {
  /**
   * 切片id
   */
  id: number = 0;

  @Column({
    title: '切片名称',
    dataIndex: 'name',
    fixed: true,
    width: 150,
  })
  /**
   * 切片名称
   */
  name: string = '';

  @Column({
    title: '病理号',
    dataIndex: 'pathology_number',
    width: 160,
  })
  /**
   * 病理号
   */
  pathology_number: string = '';

  @Column({
    title: '目录ID',
    dataIndex: 'directory_id',
    show: false,
    hideInForm: true,
    width: 100,
  })
  /**
   * 目录ID
   */
  directory_id: string = '';

  @Column({
    title: '切片类型',
    dataIndex: 'category_id',
    show: false,
    width: 100,
  })
  /**
   * 切片类型
   */
  category_id: string = '';

  @Column({
    title: '切片路径',
    dataIndex: 'path',
    width: 140,
  })
  /**
   * 切片路径
   */
  path: string = '';

  @Column({
    title: 'md5值',
    dataIndex: 'md5',
    show: false,
    width: 100,
  })
  /**
   * md5值
   */
  md5: string = '';

  @Column({
    title: '状态',
    dataIndex: 'status',
    width: 100,
  })
  /**
   * status
   */
  status: number = 100;

  @Column({
    title: '医院名称',
    dataIndex: 'hospital_name',
    width: 150,
  })
  /**
   * 医院名称
   */
  hospital_name: string = '';

  @Column({
    title: '标本类型',
    dataIndex: 'specimen_type',
    width: 100,
  })
  /**
   * 标本类型
   */
  specimen_type: string = '';

  @Column({
    title: '标本部位',
    dataIndex: 'specimen_position',
    width: 120,
  })
  /**
   * 标本部位
   */
  specimen_position: string = '';

  /**
   * 诊断类型
   */
  diagnostic_class: number = 0;

  @Column({
    title: '描述信息',
    dataIndex: 'description',
  })
  /**
   * 描述信息
   */
  description: string = '';

  @Column({
    title: '标注数量',
    dataIndex: 'label_count',
    width: 120,
  })
  /**
   * 标注数量
   */
  label_count: number = 0;

  @Column({
    title: '可用状态',
    dataIndex: 'disabled',
    width: 100,
  })
  /**
   * 可用状态
   */
  disabled: number = 0;

  @Column({
    title: '临床信息',
    hideInForm: true,
    dataIndex: 'clinical_information',
    width: 200,
  })
  /**
   * 临床信息
   */
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
  /**
   * 训练集或测试集
   */
  training_or_test: number = 0;

  @Column({
    title: '入库时间',
    dataIndex: 'created_at',
    width: 180,
    valueType: 'dateRange',
    fieldProps: {
      ranges: {
        今天: [moment(), moment()],
        昨天: [moment().add(-1, 'day'), moment().add(-1, 'day')],
        最近七天: [moment().add(-1, 'week'), moment()],
        最近一月: [moment().add(-1, 'month'), moment()],
        最近三月: [moment().add(-3, 'month'), moment()],
      },
    },
    search: {
      transform: (value: string[]) => {
        return {
          start_at: timeStringStart(value.first),
          end_at: timeStringEnd(value.last),
        };
      },
    },
    fromQuery: (value) => {
      return [getMoment(value?.start_at), getMoment(value?.end_at)];
    },
  })
  /**
   * 创建时间，即入库时间
   */
  created_at: string = '';
}
