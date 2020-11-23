import React, { useRef, useState } from 'react';
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
  const [tab, setTab] = useState<React.Key>('todo');
  console.log('allocateType', props.type);
  return (
    <div className="full-contain">
      <AutoHeightProTable<Slice>
        request={Slice.getList('/api/list')}
        toolbar={{
          filter: false,
          actions: [<Button key="allocate">分配</Button>],
          menu: {
            activeKey: tab,
            onChange: (activeKey = 'todo') => setTab(activeKey),
            items: [
              {
                key: 'todo',
                label: '未分配',
              },
              {
                key: 'done',
                label: '已分配',
              },
            ],
          },
        }}
        columns={defaultColumns}
        params={{ status: tab }}
        rowKey="id"
        extraScrollX={Slice.extraXcrollX}
        actionRef={actionRef}
      />
    </div>
  );
};
