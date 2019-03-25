import Root from '../../Root';

export class ButtonBlock extends Root {
  async render() {
    const children = await this.renderChildren();

    const block = {
      type: 'button',
    };

    if (this.props.actionID || this.props.actionId) {
      block.action_id = this.props.actionID || this.props.actionId;
    } else {
      throw new Error('<Button /> Components expect an "actionID" prop.');
    }

    if (this.props.value) {
      block.value = String(this.props.value);
    }

    if (this.props.url) {
      block.url = this.props.url;
    }

    Object.assign(block, ...children);

    return block;
  }
}
