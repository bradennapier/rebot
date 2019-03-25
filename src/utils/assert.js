import { BLOCK_ELEMENTS, LAYOUT_BLOCKS } from '../constants';

export function assertValidBlockElement(value) {
  if (typeof value !== 'object') {
    throw new Error(`Expected a block element but got type "${typeof value}"`);
  }
  if (!value.type) {
    throw new Error(
      'Expected a block element but element.type was not defined, did you provide a proper block element as a child?',
    );
  }
  if (value.type === 'image' && (value.title || value.block_id)) {
    throw new Error(
      'When an <Image /> Component is used as a Block Element, it may not have any of the properties: "title, block_id"',
    );
  }
  if (!BLOCK_ELEMENTS.includes(value.type)) {
    throw new Error(
      `Expected a block element but got type "${
        value.type
      }".  Expecting one of "${BLOCK_ELEMENTS.join(', ')}"`,
    );
  }
}

export function assertValidLayoutBlock(value) {
  if (typeof value !== 'object') {
    throw new Error(`Expected a block element but got type "${typeof value}"`);
  }
  if (!value.type) {
    throw new Error(
      'Expected a layout block block.type was not defined, did you provide a proper layout block as a child?',
    );
  }
  if (!LAYOUT_BLOCKS.includes(value.type)) {
    throw new Error(
      `Expected a block element but "${
        value.type
      }".  Expecting one of "${LAYOUT_BLOCKS.join(', ')}"`,
    );
  }
}
