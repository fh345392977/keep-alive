import React from 'react';
import Allocate from '@/pages/Allocate/Allocate';
import { KeepAlive } from 'umi';

export default () => {
  // @ts-ignore
  return (
    <KeepAlive title="标注分配" name="/allocate/label">
      <Allocate />
    </KeepAlive>
  );
};
