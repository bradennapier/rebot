function Element(wrapper) {
  return ({ children, ...props }, context) => wrapper(children, props, context);
}

function Wrapper(wrapper) {
  const children = [];
  return props => ({
    get children() {
      return props.children;
    },

    insertBefore(child, newChild) {
      const indexOf = children.indexOf(child);
      children.splice(indexOf, 0, newChild);
    },
    appendChild(child, ...args) {
      children.push(child);
    },
    updateProps(nextProps) {
      props = nextProps;
    },

    removeChild(child, ...args) {
      const index = children.indexOf(child);
      children.splice(index, 1);
    },

    render() {
      return wrapper.render(
        children.map(child =>
          typeof child === 'object' ? child.value : child,
        ),
        props,
      );
    },
  });
}

export const Elements = {
  b: Element(child => ({ value: `*${child}*` })),
  strong: Element(child => ({ value: `*${child}*` })),
  i: Element(child => ({ value: `_${child}_` })),
  strike: Element(child => ({ value: `~${child}~` })),
  br: Element(child => ({ value: `${child || ''}\n` })),
  em: Element(child => ({ value: `\`${child}\`` })),
  blockquote: Element(child => ({ value: `> ${child}` })),
  code: Element(child => ({ value: `\`\`\`${child}\`\`\`` })),
  li: Element(child => ({ value: `- ${child}` })),
  a: Element((child, props) => ({
    value: `<${props.href}|${child}>`,
  })),
  ul: Wrapper({
    render(children) {
      return `\n${children.join('\n')}\n`;
    },
  }),
  p: Wrapper({
    render(children) {
      return `\n  ${children.join('')}\n`;
    },
  }),
  div: Wrapper({
    render(children) {
      return `\n${children.join('')}\n`;
    },
  }),
  span: Wrapper({
    render(children) {
      return `${children.join('')}`;
    },
  }),
};
