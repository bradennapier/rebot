import Root from '../../Root';

export class Section extends Root {
  async render() {
    const children = await this.renderChildren();

    const block = {
      type: 'section',
    };

    Object.assign(block, ...children);

    if (this.props.blockID || this.props.blockId) {
      block.block_id = this.props.blockID || this.props.blockId;
    }

    return block;
  }
}
