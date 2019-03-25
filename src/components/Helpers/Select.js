import * as React from 'react';

import { SelectBlock } from '../../index';

import { Confirm } from './Confirm';

/**
 * <Button /> is a helper component which takes in props
 * and children to build the appropriate component tree that
 * can be rendered and updated as-needed.
 */
export class Select extends React.Component {
  render() {
    const { children, confirm, ...props } = this.props;

    const buttonChildren = [];
    if (this.props.confirm) {
      buttonChildren.push(
        <Confirm key="select_confirm" {...this.props.confirm} />,
      );
    }

    return <SelectBlock {...props}>{buttonChildren}</SelectBlock>;
  }
}
