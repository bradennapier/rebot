import Root from '../Root';

export class Actions extends Root {
  async render() {
    const children = await this.renderChildren();

    if (children.length < 1) {
      return;
    }

    const block = {
      type: 'actions',
      elements: children,
    };

    if (this.props.blockID || this.props.blockId) {
      block.block_id = this.props.blockID || this.props.blockId;
    }

    return block;
  }
}
