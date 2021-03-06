import { Column, MetaEnhancedClass } from '@/metadata/utils';
import { Base } from '@/metadata/base';
import React from 'react';
import { Input } from 'antd';

@MetaEnhancedClass()
export default class RuleLog extends Base {
  key: number = 0;

  disabled: boolean = false;

  href: string = '';

  @Column({
    title: '规则名称',
    dataIndex: 'name',
    tip: '规则名称是唯一的 key',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
  })
  name: string = '';

  owner: string = '';

  @Column({
    title: '描述',
    dataIndex: 'desc',
    valueType: 'textarea',
  })
  desc: string = '';

  @Column({
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    hideInForm: true,
    show: false,
    renderText: (val: string) => `${val} 万`,
  })
  callNo: number = 0;

  @Column({
    title: '状态',
    dataIndex: 'status',
    hideInForm: true,
    valueEnum: {
      0: { text: '关闭', status: 'Default' },
      1: { text: '运行中', status: 'Processing' },
      2: { text: '已上线', status: 'Success' },
      3: { text: '异常', status: 'Error' },
    },
  })
  status: number = 0;

  @Column({
    title: '上次调度时间',
    dataIndex: 'updatedAt',
    sorter: true,
    valueType: 'dateTime',
    hideInForm: true,
    renderFormItem: (item, { defaultRender, ...rest }, form) => {
      const status = form.getFieldValue('status');
      if (`${status}` === '0') {
        return false;
      }
      if (`${status}` === '3') {
        return <Input {...rest} placeholder="请输入异常原因！" />;
      }
      return defaultRender(item);
    },
  })
  updatedAt: Date = new Date();

  createdAt: Date = new Date();

  progress: number = 0;
}
