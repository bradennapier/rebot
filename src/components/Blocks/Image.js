import Root from '../Root';

export class Image extends Root {
  async render() {
    const children = await this.renderChildren();

    if (children.length > 0) {
      throw new Error('<ImageBlock /> Components should not have any children');
    }

    const block = {
      type: 'image',
    };

    if (this.props.blockID || this.props.blockId) {
      block.block_id = this.props.blockID || this.props.blockId;
    }

    if (this.props.url || this.props.imageURL || this.props.imageUrl) {
      block.image_url =
        this.props.url || this.props.imageURL || this.props.imageUrl;
    } else {
      throw new Error('<ImageBlock /> Components must have an "url" prop.');
    }

    if (this.props.alt || this.props.altText) {
      block.alt_text = this.props.alt || this.props.altText;
    } else {
      throw new Error('<ImageBlock /> Components must have an "alt" property.');
    }

    if (this.props.title) {
      block.title = {
        type: 'plain_text',
        text: this.props.title,
      };
    }

    return block;
  }
}
