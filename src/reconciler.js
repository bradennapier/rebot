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
  // useSyncScheduling: true,
  appendInitialChild(parent, child) {
    // console.log('appendInitialChild: ', { parent, child });
    if (parent.appendChild) {
      parent.appendChild(child);
    } else {
      // console.log('No Append Child!');
    }
  },

  appendChildToContainer(container, child) {
    // console.log('Append Child To Container: ', { container, child });
    container.appendChild(child);
  },

  createInstance(type, props, handle) {
    // console.log('createInstance: ', { type, props, handle, PARENT });
    return createElement(type, props, handle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    // console.log('createTextInstance: ', {
    //   text,
    //   rootContainerInstance,
    //   internalInstanceHandle,
    // });
    return text;
  },

  finalizeInitialChildren(element, type, props) {
    // console.log('finalizeInitialChildren ', { element, type, props });
    return false;
  },

  getPublicInstance(instance, ...args) {
    // console.log('getPublicInstance ', { instance, args });
    return instance;
  },

  prepareForCommit(...args) {
    // console.log('prepareForCommit ', { args });
    // noop
  },

  prepareUpdate(element, type, oldProps, newProps) {
    // console.log('prepareUpdate ', { element, type, oldProps, newProps });
    const propsEqual = shallowEqual(oldProps, newProps);
    // console.log('prepareUpdate? ', { element, type, propsEqual });
    return !propsEqual;
  },

  resetAfterCommit(...args) {
    // console.log('resetAfterCommit', { args });
    ROOT_INSTANCE.renderChildren();
    // noop
  },

  resetTextContent(element, ...args) {
    // console.log('resetTextContent ', { element, args });
    // noop
  },

  getRootHostContext(instance, ...args) {
    // console.log('getRootHostContext ', { instance, args });
    ROOT_INSTANCE = instance;
    // You can use this 'rootInstance' to pass data from the roots.
    return instance;
  },

  getChildHostContext(...args) {
    // console.log('getChildHostContext ', { instance, type, handle });
    PARENT = args;
    return emptyObject;
  },

  shouldSetTextContent(type, props, ...args) {
    // console.log('shouldSetTextContent ', { type, props, args });
    if (
      Elements[type] &&
      (typeof props.children === 'string' || typeof props.children === 'number')
    ) {
      // console.log('YES!');
      return false;
    }
    return false;
  },

  /** POSSIBLY NEVER USED */

  shouldDeprioritizeSubtree(...args) {
    // console.log('shouldDeprioritizeSubtree ', { args });
  },

  appendChild(parentInstance, child) {
    // console.log('! append Child !');
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  removeChild(parentInstance, child) {
    // console.log('! removeChild ! ', parentInstance, child);
    parentInstance.removeChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    // console.log('! insertBefore ! ', { parentInstance, child, beforeChild });
    parentInstance.insertBefore(beforeChild, child);
    // noob
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    // console.log('! insert in container before !');
    parentInstance.insertBefore(beforeChild, child);
  },

  removeChildFromContainer(parentInstance, child) {
    // console.log('! remove Child From Container ! ');
    parentInstance.removeChild(child);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    // console.log('! commitUpdate !', {
    //   instance,
    //   updatePayload,
    //   type,
    //   oldProps,
    //   newProps,
    // });
    if (typeof instance === 'object') {
      if (instance.updateProps) {
        instance.updateProps(newProps);
        return;
      }
      if (instance.value && Elements[type]) {
        instance.value = Elements[type](newProps, type, ROOT_INSTANCE).value;
        return;
      }
    }

    console.log('!! COMMIT UPDATE FAILS !!', {
      instance,
      updatePayload,
      type,
      oldProps,
      newProps,
    });
    // noop
  },

  commitMount(instance, updatePayload, props, oldProps, newProps) {
    // console.log('! commitMount !', {
    //   instance,
    //   updatePayload,
    //   props,
    //   oldProps,
    //   newProps,
    // });
    // return 'hii';
    // noop
  },

  commitTextUpdate(textInstance, oldText, newText, ...args) {
    // console.log('! commitTextUpdate !', {
    //   textInstance,
    //   oldText,
    //   newText,
    //   args,
    //   parent: [...PARENT],
    // });
    return newText;
  },

  hideInstance(...args) {
    // console.log('! hide instance ! ', args);
  },

  hideTextInstance(...args) {
    console.log('! hide text instance ! ', args);
  },

  unhideInstance(...args) {
    console.log('! unhide instance ! ', args);
  },

  unhideTextInstance(...args) {
    console.log('! unhide text instance !', args);
  },
});
