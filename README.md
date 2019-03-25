# rebot

```javascript
// retained in case needed
appendChild(parentInstance, child) {
    console.log('! append Child !');
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  removeChild(parentInstance, child) {
    console.log('! removeChild ! ', parentInstance, child);
    parentInstance.removeChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    console.log('! insertBefore ! ');
    // noob
  },

  insertInContainerBefore(...args) {
    console.log('! insert in container before !');
  },

  removeChildFromContainer(parentInstance, child) {
    console.log('! remove Child From Container ! ');
    parentInstance.removeChild(child);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    console.log('! commitUpdate !');
    // noop
  },

  commitMount(instance, updatePayload, type, oldProps, newProps) {
    console.log('! commitMount 1');
    // noop
  },

  commitTextUpdate(textInstance, oldText, newText) {
    console.log('! commitTextUpdate !');
    textInstance.children = newText;
  },

  hideInstance(...args) {
    console.log('! hide instance ! ', args);
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
```
