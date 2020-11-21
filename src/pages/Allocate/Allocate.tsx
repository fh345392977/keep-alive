import React, { useRef, useState } from 'react';
import AutoHeightProTable from '@/components/AutoHeightProTable';
import Slice from '@/model/Slice';
import { ActionType } from '@ant-design/pro-table';
import { Button, Tabs } from 'antd';

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
  const [tab, setTab] = useState('todo');
  console.log('allocateType', props.type);
  return (
    <div className="full-contain flex column">
      <Tabs activeKey={tab} onChange={setTab}>
        <Tabs.TabPane tab="未分配" key="todo" />
        <Tabs.TabPane tab="已分配" key="done" />
      </Tabs>
      <div className="flex-1">
        <AutoHeightProTable<Slice>
          request={Slice.getList('/api/list')}
          toolbar={{
            filter: false,
            actions: [<Button key="allocate">分配</Button>],
          }}
          columns={defaultColumns}
          params={{ status: tab }}
          rowKey="id"
          extraScrollX={Slice.extraXcrollX}
          actionRef={actionRef}
        />
      </div>
    </div>
  );
};
