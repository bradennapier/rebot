/* @flow */
import * as Components from './components';
import { Elements } from './elements';

/**
 * Creates an element for a document
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
export default function createElement(type, props, root) {
  if (Components[type]) {
    return new Components[type](root, props);
  }
  if (typeof Elements[type] === 'function') {
    return Elements[type](props, type, root);
  }
  return Elements[type];
}
