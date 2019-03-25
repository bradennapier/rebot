/* @flow */
import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import createElement from './createElement';

import shallowEqual from './utils/shallowEqual';

import { Elements } from './elements';

let ROOT_INSTANCE = null;

let PARENT = null;

export default Reconciler({
  now: Date.now,
  supportsMutation: true,
  isPrimaryRenderer: true,

  appendInitialChild(parent, child) {
    if (parent.appendChild) {
      parent.appendChild(child);
    }
  },

  appendChildToContainer(container, child) {
    container.appendChild(child);
  },

  createInstance(type, props, handle) {
    return createElement(type, props, handle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(element, type, props) {
    return false;
  },

  getPublicInstance(instance, ...args) {
    return instance;
  },

  prepareForCommit(...args) {},

  prepareUpdate(element, type, oldProps, newProps) {
    const propsEqual = shallowEqual(oldProps, newProps);
    return !propsEqual;
  },

  resetAfterCommit(...args) {
    ROOT_INSTANCE.renderChildren();
  },

  resetTextContent(element, ...args) {},

  getRootHostContext(instance, ...args) {
    ROOT_INSTANCE = instance;
    // You can use this 'rootInstance' to pass data from the roots.
    return instance;
  },

  getChildHostContext(...args) {
    PARENT = args;
    return emptyObject;
  },

  shouldSetTextContent(type, props, ...args) {
    if (
      Elements[type] &&
      (typeof props.children === 'string' || typeof props.children === 'number')
    ) {
      // TODO - put time into finding why this needs to be false atm
      return false;
    }
    return false;
  },

  shouldDeprioritizeSubtree(...args) {},

  appendChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(beforeChild, child);
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(beforeChild, child);
  },

  removeChildFromContainer(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    if (typeof instance === 'object') {
      if (instance.updateProps) {
        instance.updateProps(newProps);
        return;
      }
      if (instance.value && Elements[type]) {
        instance.value = Elements[type](newProps, type, ROOT_INSTANCE).value;
      }
    }
    // noop
  },

  commitMount(instance, updatePayload, props, oldProps, newProps) {},

  commitTextUpdate(textInstance, oldText, newText, ...args) {
    return newText;
  },

  hideInstance(...args) {},

  hideTextInstance(...args) {},

  unhideInstance(...args) {},

  unhideTextInstance(...args) {},
});
