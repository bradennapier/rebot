import * as React from 'react';

import { Props } from '../../index';

export function Fields({ children }) {
  // const finalChildren = children.filter(Boolean);
  // if (finalChildren.length === 0) {
  //   return;
  // }
  return <Props as="fields">{children}</Props>;
}
