// import * as React from 'react';

export default class Root {
  parent = null;

  children = [];

  _reactChildren = undefined;

  constructor(root, { children, ...props }) {
    this.props = props;
    this._reactChildren = children;
  }

  appendChild(child) {
    // console.log('--> Append Child: ', child);
    if (typeof child === 'object') {
      child.parent = this;
    }
    this.children.push(child);
  }

  async updateProps(nextProps) {
    // console.log('UPDATE PROPS ', this.children[0].render);
    this.props = nextProps;
  }

  removeChild(child, ...args) {
    // console.log('Remove Child: ', child, args);
    const index = this.children.indexOf(child);
    if (typeof child === 'object') {
      child.parent = null;
    }
    this.children.splice(index, 1);
  }

  async renderChildren() {
    const rendered = [];
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      rendered.push(
        typeof child === 'object' && child.render
          ? // eslint-disable-next-line no-await-in-loop
            await child.render()
          : child,
      );
    }
    return rendered;
  }
}
