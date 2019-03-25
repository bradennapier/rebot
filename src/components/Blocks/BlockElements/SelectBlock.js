import Root from '../../Root';

export class SelectBlock extends Root {
  async render() {
    const block = {
      type: 'static_select',
    };

    if (this.props.actionID || this.props.actionId) {
      block.action_id = this.props.actionID || this.props.actionId;
    } else {
      throw new Error('<Select /> Components expect an "actionID" prop.');
    }

    if (this.props.placeholder) {
      block.placeholder = {
        type: 'plain_text',
        text: this.props.placeholder,
      };
    } else {
      throw new Error('<Select /> Components expect a "placeholder" prop.');
    }

    if (this.props.channels) {
      block.type = 'channels_select';
    } else if (this.props.conversations) {
      block.type = 'conversations_select';
    } else if (this.props.users) {
      block.type = 'users_select';
    }

    const initial =
      this.props.initial ||
      this.props.initialOption ||
      this.props.initialConversation ||
      this.props.initialChannel ||
      this.props.initialUser;

    if (initial) {
      switch (block.type) {
        case 'channels_select': {
          block.initial_channel = initial;
          break;
        }
        case 'users_select': {
          block.initial_user = initial;
          break;
        }
        case 'conversations_select': {
          block.initial_conversation = initial;
          break;
        }
        default: {
          block.initial_option = initial;
          break;
        }
      }
    }

    const children = await this.renderChildren();
    Object.assign(block, ...children);

    return block;
  }
}
