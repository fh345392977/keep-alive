import React, { useRef } from 'react';
import AutoHeightProTable from '@/components/AutoHeightProTable';
import Slice from '@/model/Slice';
import { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useParams } from 'umi';

export interface AllocateRouteParams {
  type: string;
}

export default () => {
  const columns = Slice.getColumns<Slice>();
  const actionRef = useRef<ActionType>();
  const { type } = useParams<AllocateRouteParams>();
  return (
    <div className="full-contain">
      <AutoHeightProTable<Slice>
        id="allocate"
        request={Slice.getList('/api/rule')}
        countOptions={{
          api: '/api/list/count',
        }}
        toolbar={{
          actions: [<Button key="allocate">分配</Button>],
        }}
        defaultMenu="todo"
        menus={[
          {
            key: 'todo',
            label: '未分配',
          },
          {
            key: 'done',
            label: '已分配',
          },
        ]}
        params={{ type }}
        tabParamsFormatter={(tab) => ({ status: tab })}
        tabFromSearch={(values) => values?.status}
        columns={columns}
        setParamsToRoute
        rowKey="id"
        extraScrollX={Slice.extraXcrollX}
        actionRef={actionRef}
      />
    </div>
  );
};
