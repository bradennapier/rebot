import * as React from 'react';

import { Text, TextBlock, ButtonBlock, Prop } from '../../index';

import { Confirm } from './Confirm';

/**
 * <Button /> is a helper component which takes in props
 * and children to build the appropriate component tree that
 * can be rendered and updated as-needed.
 */
export class Button extends React.Component {
  render() {
    const { children, confirm, ...props } = this.props;

    const buttonChildren = [
      <TextBlock plain key="button_text">
        {children}
      </TextBlock>,
    ];
    if (this.props.confirm) {
      buttonChildren.push(
        <Confirm key="button_confirm" {...this.props.confirm} />,
      );
    }

    return <ButtonBlock {...props}>{buttonChildren}</ButtonBlock>;
  }
}
