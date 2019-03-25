import Root from '../../Root';

import { assertValidBlockElement } from '../../../utils/assert';

export class Accessory extends Root {
  async render() {
    const children = await this.renderChildren();
    if (children.length > 1) {
      throw new Error('<Accessory> Component expects a single child.');
    }
    const accessory = children[0];
    assertValidBlockElement(accessory);
    return {
      accessory,
    };
  }
}
