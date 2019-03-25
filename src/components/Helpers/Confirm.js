import * as React from 'react';

import { Text, Prop } from '../../index';

export function Confirm({ title, confirm, deny, text }) {
  return (
    <Prop as="confirm">
      <Prop as="title">
        <Text block plain emoji>
          {title || 'Are You Sure?'}
        </Text>
      </Prop>
      <Prop as="text">
        <Text block>{text}</Text>
      </Prop>
      <Prop as="confirm">
        <Text block plain emoji>
          {confirm || 'Confirm'}
        </Text>
      </Prop>
      <Prop as="deny">
        <Text block plain emoji>
          {deny || 'Cancel'}
        </Text>
      </Prop>
    </Prop>
  );
}
