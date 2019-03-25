import * as React from 'react';

import { Props } from '../../index';

export function Fields({ children }) {
  return <Props as="fields">{children}</Props>;
}
