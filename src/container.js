export default function Root(rootElement, config) {
  // console.log('[Root] | Creating Root Container');
  const children = [];

  return {
    get children() {
      return children;
    },
    async appendChild(child) {
      // console.log('!!Append Child: ', child, args);
      children.push(child);
    },
    insertBefore(child, newChild) {
      children.splice(children.indexOf(child), 0, newChild);
    },
    removeChild(child) {
      // console.log('!!Remove Child: ', child, args);
      children.splice(children.indexOf(child), 1);
    },

    async renderChildren() {
      await Promise.all(children.map(child => child.render(config)));
    },
  };
}
