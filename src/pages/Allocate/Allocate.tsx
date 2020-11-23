import React, { useRef } from 'react';
import AutoHeightProTable from '@/components/AutoHeightProTable';
import Slice from '@/model/Slice';
import { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';

export enum AllocateTypeEnum {
  label = 'label',
  review = 'review',
  refine = 'refine',
}

export interface AllocateProps {
  type: AllocateTypeEnum;
}

export default (props: AllocateProps) => {
  const defaultColumns = Slice.getColumns<Slice>();
  const actionRef = useRef<ActionType>();
  console.log('allocateType', props.type);
  return (
    <div className="full-contain">
      <AutoHeightProTable<Slice>
        request={Slice.getList('/api/list')}
        countOptions={{
          api: '/api/list/count',
        }}
        toolbar={{
          actions: [<Button key="allocate">分配</Button>],
        }}
        defaultTab="todo"
        tabs={[
          {
            key: 'todo',
            label: '未分配',
          },
          {
            key: 'done',
            label: '已分配',
          },
        ]}
        tabParamsFormatter={(tab) => ({ status: tab })}
        columns={defaultColumns}
        rowKey="id"
        extraScrollX={Slice.extraXcrollX}
        actionRef={actionRef}
      />
    </div>
  );
};
