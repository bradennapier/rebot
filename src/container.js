export default function Root(rootElement, config) {
  const children = [];

  return {
    get children() {
      return children;
    },
    async appendChild(child) {
      children.push(child);
    },
    insertBefore(child, newChild) {
      children.splice(children.indexOf(child), 0, newChild);
    },
    removeChild(child) {
      children.splice(children.indexOf(child), 1);
    },

    async renderChildren() {
      await Promise.all(children.map(child => child.render(config)));
    },
  };
}
