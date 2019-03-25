import Root from './Root';

export class Message extends Root {
  state = {
    prevMessage: undefined,
    overrides: {},
  };

  async render(config) {
    const { state } = this;

    const message = {
      ...this.props,
    };

    const children = await this.renderChildren();

    Object.assign(message, ...children, state.overrides);

    const nextMessage = JSON.stringify(message);

    // console.log(JSON.stringify(message, null, 2));
    if (!state.prevMessage) {
      state.prevMessage = nextMessage;
      const result = await config.engine.sendMessage(nextMessage);
      state.overrides.channel = result.channel;
      state.overrides.ts = result.ts;
    } else if (nextMessage !== state.prevMessage) {
      state.prevMessage = nextMessage;
      await config.engine.updateMessage(nextMessage);
    }
  }
}
