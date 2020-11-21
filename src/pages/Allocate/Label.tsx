import React from 'react';
import Allocate, { AllocateTypeEnum } from '@/pages/Allocate/Allocate';

export default () => {
  return <Allocate type={AllocateTypeEnum.label} />;
};
