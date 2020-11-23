import React, { useRef } from 'react';
import AutoHeightProTable from '@/components/AutoHeightProTable';
import Slice from '@/model/Slice';
import { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useParams, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

export interface AllocateRouteProps {
  type: string;
}

const Allocation = (props: RouteComponentProps) => {
  const defaultColumns = Slice.getColumns<Slice>();
  const actionRef = useRef<ActionType>();
  const { type } = useParams<AllocateRouteProps>();
  console.log('route', props.location);
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
        columns={defaultColumns}
        rowKey="id"
        extraScrollX={Slice.extraXcrollX}
        actionRef={actionRef}
      />
    </div>
  );
};

export default withRouter(Allocation);
