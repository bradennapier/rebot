# rebot

This is an early-phase experiment in building a native React Fiber Reconciler with the Slack API as an endpoint. At this point is only using REST and not WebSocket to create and update messages as their state changes. Much more can be done (such as directly adding `onClick` to `<Button />`, etc) once the WS API is used as well.

> **Note:** While most features should work at this point, there are some pieces of the reconciler which are not setup such as the newest Suspense/Lazy capabilities.

> **Note:** In my internal version I have `attachments` and `dialogs` working, but I will need to refactor this before making it public as it is tied into the project this is used within still.

> **Note:** This is not yet published to `npm` and must be tested directly by cloning the repo and running the example.

## Example

The example below is a bit of a "kitchen sink" test showing and testing the re-render capabilities using the standard React API.

![image](https://user-images.githubusercontent.com/15365418/54894830-d995e700-4e79-11e9-9508-82890d6eac21.png)

```javascript
import * as React from 'react';

import {
  render,
  Message,
  TextBlock,
  Blocks,
  Section,
  Fields,
  TextField,
  Divider,
} from './src';

import createAxiosEngine from './src/engines/slack-axios';

function EtherscanLink({ tx }) {
  return (
    <Section>
      <TextBlock>
        <b>Transaction</b>
        <br />
        <a href={`https://www.etherscan.io/tx/${tx}`}>{tx}</a>
      </TextBlock>
    </Section>
  );
}
class TransactionStatus extends React.Component {
  state = {
    confirmations: 28,
    needed: 30,
  };

  timerID = undefined;

  componentDidMount() {
    if (this.state.confirmations < this.state.needed) {
      this.timerID = setInterval(() => {
        this.setState({
          confirmations: this.state.confirmations + 1,
        });
      }, 3000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { confirmations } = this.state;
    const status =
      this.state.confirmations === this.state.needed ? 'Confirmed' : 'Pending';
    if (status === 'Confirmed') {
      clearInterval(this.timerID);
    }
    return (
      <Section>
        <Fields>
          <TextField>
            <span>
              <b>Status</b>
              <br />
              {status}
            </span>
          </TextField>
          <TextField>
            <span>
              <b>Confirmations</b>
              <br />
              {confirmations} / 30
            </span>
          </TextField>
        </Fields>
      </Section>
    );
  }
}

class StatefulMessage extends React.Component {
  state = {
    text: 'The Transaction is processing.',
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        text: 'Changed',
      });
    }, 3000);
  }

  render() {
    return (
      <Section>
        <TextBlock>{this.state.text}</TextBlock>
      </Section>
    );
  }
}

function MyMessage() {
  const props = {
    tx: '0x822846e2d067847656f6ac3ea701fe1a1917c50053dd426ab793c1decaa910b5',
  };
  return (
    <Message channel="monitoring">
      <Blocks>
        <StatefulMessage />
        <Divider />
        <EtherscanLink tx={props.tx} />
        <TransactionStatus tx={props.tx} />
        <Divider />
      </Blocks>
    </Message>
  );
}

render(<MyMessage example />, {
  id: 'my-renderer-id',
  engine: createAxiosEngine({
    oauth_token: '<token>',
  }),
});
```
