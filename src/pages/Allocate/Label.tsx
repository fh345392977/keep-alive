import React from 'react';
import Allocate from '@/pages/Allocate/Allocate';
import { KeepAlive } from 'umi';

export default () => {
  return (
    <KeepAlive name="/allocate/label" title="标注分配">
      <Allocate />
    </KeepAlive>
  );
  // return <Allocate />;
};
