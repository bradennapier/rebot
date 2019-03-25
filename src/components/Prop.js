import Root from './Root';

export class Prop extends Root {
  async render() {
    if (!this.props.as) {
      throw new Error('<Prop /> requires an "as" prop');
    }
    const children = await this.renderChildren();
    const block = Object.assign({}, ...children);
    return {
      [this.props.as]: block,
    };
  }
}

export class Props extends Root {
  async render() {
    if (!this.props.as) {
      throw new Error('<Prop /> requires an "as" prop');
    }
    const children = await this.renderChildren();
    return {
      [this.props.as]: children,
    };
  }
}
