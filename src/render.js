import Reconciler from './reconciler';

import RootContainer from './container';

// console.log('Reconciler ', Reconciler);
// renders the component

const roots = new Map();

export default async function render(element, config, callback) {
  // console.log('[render] | root render called');
  let container;
  if (!config.id) {
    throw new Error('SlackRenderer.render() requires an "id" property');
  }
  if (!config.engine) {
    throw new Error(
      'SlackRenderer.render() requires an "engine" property to work properly',
    );
  }
  if (roots.has(config.id)) {
    container = roots.get(config.id);
  } else {
    container = Reconciler.createContainer(
      RootContainer(element, config),
      false,
    );
    roots.set(config.id, container);
  }

  Reconciler.updateContainer(element, container, null, () => {
    if (callback) callback();
  });

  return Reconciler.getPublicRootInstance(container);
}
