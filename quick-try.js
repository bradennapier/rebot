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

function MyMessage({ tx }) {
  return (
    <Message channel="monitoring">
      <Blocks>
        <StatefulMessage />
        <Divider />
        <EtherscanLink tx={tx} />
        <TransactionStatus tx={tx} />
        <Divider />
      </Blocks>
    </Message>
  );
}

render(
  <MyMessage tx="0x822846e2d067847656f6ac3ea701fe1a1917c50053dd426ab793c1decaa910b5" />,
  {
    id: 'my-renderer-id',
    engine: createAxiosEngine({
      oauth_token: '<token>',
    }),
  },
);
