import { useAliveController } from 'umi';

import React from 'react';
import Tab from './Tab';
import styles from './styles.less';

export default function KeepAliveTabs() {
  const { getCachingNodes } = useAliveController();
  const cachingNodes = getCachingNodes();

  return (
    <ul className={styles['alive-tabs']}>
      {cachingNodes.map((node) => (
        <Tab key={node.id} node={node} />
      ))}
    </ul>
  );
}
