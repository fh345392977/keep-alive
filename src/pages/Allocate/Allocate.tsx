import React from 'react';
import AutoHeightProTable from '@/components/AutoHeightProTable';
import Slice from '@/model/Slice';
import { Button } from 'antd';
import { useParams } from 'umi';

export interface AllocateRouteParams {
  type: string;
}

export default () => {
  const columns = Slice.getColumns<Slice>();
  const { type } = useParams<AllocateRouteParams>();
  return (
    <div className="full-contain">
      <AutoHeightProTable<Slice>
        id="allocate"
        request={Slice.getList('/api/list')}
        menuOptions={{
          api: '/api/list/count',
          menus: [
            {
              key: 'todo',
              label: '未分配',
            },
            {
              key: 'done',
              label: '已分配',
            },
          ],
          menuKey: 'allocate_status',
          defaultMenu: 'todo',
        }}
        toolbar={{
          actions: [<Button key="allocate">分配</Button>],
        }}
        params={{ type }}
        columns={columns}
        setParamsToRoute
        rowKey="id"
        extraScrollX={200}
      />
    </div>
  );
};
