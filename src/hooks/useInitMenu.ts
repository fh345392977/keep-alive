import { useState } from 'react';

export default (
  tabKey: string | undefined,
  tabFromSearch: ((value: any) => string | undefined) | undefined,
  values: any,
  defaultMenu: string,
) => {
  let initMenu = defaultMenu;
  if (tabKey) {
    initMenu = values[tabKey];
  }
  initMenu = tabFromSearch?.(values) ?? initMenu;
  console.log('initMenu', initMenu);
  return useState<React.Key>(initMenu);
};
