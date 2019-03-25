import Root from './Root';

async function handleRender(_block = {}) {
  const block = _block;
  const children = await this.renderChildren();

  block.text = children
    .map(child => (typeof child === 'object' ? child.value : child))
    .join('');

  if (this.props.plainText || this.props.plain) {
    block.type = 'plain_text';
  }
  if (this.props.markdown) {
    block.type = 'mrkdwn';
  }

  if (this.props.verbatim) {
    if (block.type === 'plain_text') {
      throw new Error(
        'A text block not use "verbatim" unless type is "markdwn" (plainText is not true).',
      );
    }
    block.verbatim = true;
  }
  if (this.props.emoji) {
    if (block.type !== 'plain_text') {
      throw new Error(
        'A text block may not set emoji to true unless plainText is also true',
      );
    }
    block.emoji = true;
  }
  return block;
}
export class Text extends Root {
  async render() {
    const block = await handleRender.call(this);
    if (this.props.block && !block.type) {
      block.type = 'mrkdwn';
    }
    return block;
  }
}

export class TextBlock extends Root {
  async render() {
    const block = await handleRender.call(this, { type: 'mrkdwn' });
    return { [this.props.as || 'text']: block };
  }
}
