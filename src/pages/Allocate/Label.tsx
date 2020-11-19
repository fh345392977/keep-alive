import React, { useRef } from 'react';
import AutoHeightProTable from '@/components/AutoHeightProTable';
import Slice from '@/model/slice';
import { ActionType } from '@ant-design/pro-table';

export default () => {
  const defaultColumns = Slice.getColumns<Slice>();
  const actionRef = useRef<ActionType>();
  console.log(new Slice());
  return (
    <AutoHeightProTable<Slice>
      columns={defaultColumns}
      rowKey="id"
      extraScrollX={Slice.extraXcrollX}
      actionRef={actionRef}
      dataSource={[new Slice()]}
    />
  );
};
