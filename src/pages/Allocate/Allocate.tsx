import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

export interface AllocateItemProps {
  status: string;
}

const Allocate: React.FC<AllocateItemProps> = props => {
  return <PageContainer>Allocate-{props.status}</PageContainer>
}

export default Allocate;