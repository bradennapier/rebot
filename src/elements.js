function Element(wrapper) {
  return ({ children, ...props }, context) => wrapper(children, props, context);
}

function Wrapper(wrapper) {
  return initialProps => {
    let children = [];
    let props = initialProps;
    return {
      get children() {
        return children;
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
        children = nextProps.children;

        // console.log('updated props: ', nextProps.children);
      },

      removeChild(child, ...args) {
        const index = children.indexOf(child);
        children.splice(index, 1);
      },

      render() {
        const result = wrapper.render(
          children.map((child, idx) => {
            if (typeof child === 'object' && Elements[child.type]) {
              const result = Elements[child.type](child.props);
              return result.value;
            }
            return typeof child === 'object' ? child.value : child;
          }),
          props,
        );

        return result;
      },
    };
  };
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
