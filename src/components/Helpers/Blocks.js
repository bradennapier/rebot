import * as React from 'react';

import { Props } from '../../index';

export function Blocks({ children }) {
  return <Props as="blocks">{children.filter(Boolean)}</Props>;
}
