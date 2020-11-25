import { useState } from 'react';

export default (
  menuKey: string | undefined,
  menuFromRoute: ((value: any) => string | undefined) | undefined,
  values: any,
  defaultMenu: string,
) => {
  let initMenu = defaultMenu;
  if (menuKey) {
    initMenu = values[menuKey];
  }
  initMenu = menuFromRoute?.(values) ?? initMenu;
  return useState<React.Key>(initMenu);
};
