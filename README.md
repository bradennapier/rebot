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
  Accessory,
  Button,
  TextField,
  Divider,
  Image,
  Actions,
  Select,
} from './src';

import createAxiosEngine from './src/engines/slack-axios';

class StatefulText extends React.Component {
  state = {
    url: 'https://www.google.com',
    name: 'Google',
    list: ['One', 'Two', 'Three'],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        url: 'https://www.bing.com',
        name: 'Bing',
        list: ['Zero', ...this.state.list, 'Four'],
      });
    }, 3000);
  }

  render() {
    const { url, name, list } = this.state;
    return (
      <Section>
        <TextBlock>
          Welcome to <strong>React Slack Renderer!</strong> <br />
          You can visit <a href={url}>{name}</a> if you want
          <ul>
            {list.map(el => (
              <li key={el}>{el}</li>
            ))}
          </ul>
        </TextBlock>
      </Section>
    );
  }
}

class StatefulButtonText extends React.Component {
  state = {
    text: (
      <span>
        <b>Do you want</b> to do this?
      </span>
    ),
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        text: 'Do you want to?',
      });
    }, 3000);
  }

  render() {
    return this.state.text;
  }
}

function MySection() {
  return (
    <Section blockID="Test">
      <TextBlock>Some Text in the section!</TextBlock>
      <Accessory>
        <Button
          actionID="section_button"
          confirm={{
            title: 'Are You Sure?',
            text: <StatefulButtonText />,
            confirm: 'Yes!',
            deny: 'No!',
          }}
        >
          My Button
        </Button>
      </Accessory>
      <Fields>
        <TextField>
          <b>Title</b>
          <br />
          One
        </TextField>
        <TextField>
          <b>Title</b>
          <br />
          Two
        </TextField>
      </Fields>
    </Section>
  );
}

function MyMessage() {
  return (
    <Message channel="monitoring">
      <Blocks>
        <Divider />
        <StatefulText />
        <Divider />
        <Image
          title="Cutie!"
          alt="Little Kitten"
          url="http://placekitten.com/500/500"
        />
        <Divider />
        <MySection />
        <Divider />
        <Actions>
          <Select
            actionID="channel_select"
            placeholder="Select a Channel"
            channels
          />
        </Actions>
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
