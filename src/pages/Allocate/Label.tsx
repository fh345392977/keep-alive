import React, { useRef, useState } from 'react';
import AutoHeightProTable from '@/components/AutoHeightProTable';
import Slice from '@/model/Slice';
import { ActionType } from '@ant-design/pro-table';
import { Tabs } from 'antd';

export default () => {
  const defaultColumns = Slice.getColumns<Slice>();
  const actionRef = useRef<ActionType>();
  const [tab, setTab] = useState('todo');
  return (
    <div className="full-contain flex column">
      <Tabs activeKey={tab} onChange={setTab}>
        <Tabs.TabPane tab="未分配" key="todo" />
        <Tabs.TabPane tab="已分配" key="done" />
      </Tabs>
      <div className="flex-1">
        <AutoHeightProTable<Slice>
          request={Slice.getList('/api/list')}
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
