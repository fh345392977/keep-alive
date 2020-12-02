import { useHistory, useLocation, useAliveController, CachingNode } from 'umi';
import { CloseCircleOutlined } from '@ant-design/icons';

import React from 'react';
import styles from './styles.less';

export default function Tab({ node }: { node: CachingNode }) {
  const history = useHistory();
  const location = useLocation();
  const { getCachingNodes, dropScope } = useAliveController();
  const cachingNodes = getCachingNodes();
  const closable = cachingNodes.length > 1;

  function dropTab(e: any) {
    e.stopPropagation();
    const currentName = node.name;

    // 如果关闭激活中的 KeepAlive Tab，需要先离开当前路由
    // 触发 KeepAlive unactivated 后再进行 drop
    if (location.pathname === currentName) {
      const unlisten = history.listen(() => {
        unlisten();
        setTimeout(() => {
          dropScope(currentName);
        }, 60);
      });

      // 前往排除当前 node 后的最后一个 tab
      const lastNode = cachingNodes.filter((i) => i.name !== currentName).pop();
      if (lastNode?.name) {
        history.push(lastNode?.name);
      }
    } else if (currentName) {
      dropScope(currentName);
    }
  }

  return (
    <li
      className={location.pathname === node.name ? styles.active : ''}
      onClick={() => {
        history.push(node.name as string);
      }}
    >
      {node.title || node.name}
      {closable && <CloseCircleOutlined className={styles['close-btn']} onClick={dropTab} />}
    </li>
  );
}
