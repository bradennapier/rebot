/* @flow */
import axios from 'axios';
import { request, rawRequest, getRequest } from './request';

import type { Slack$Payloads } from '../../types/slack';

function createRequester(config) {
  // we need to do this so we can have access to the
  // secrets on the first request
  return axios.create({
    baseURL: 'https://slack.com/api',
    headers: {
      'User-Agent': 'rebot',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.oauth_token}`,
    },
  });
}

export default function slackAxiosEngine(config) {
  if (!config.oauth_token) {
    throw new Error('Slack requires an "oauth_token" property to function.');
  }

  const requester = createRequester(config);

  return Object.freeze({
    reply(body: Slack$Payloads, response: Bot$Message) {
      if (!body.response_url) {
        throw new Error(
          'Slack Reply requires that "response_url" is included in the body of the original message',
        );
      }
      return rawRequest(body.response_url, response);
    },
    openDialog(body: Slack$Payloads, dialog: Bot$Dialog) {
      if (!body.token || !body.trigger_id) {
        throw new Error(
          'Slack Dialog requires a token and trigger_id but one was missing.',
        );
      }
      return request(
        requester,
        'dialog.open',
        {
          token: body.token,
          trigger_id: body.trigger_id,
          dialog: JSON.stringify(dialog),
        },
        body,
      );
    },
    sendMessage(message: Bot$Message) {
      return request(requester, 'chat.postMessage', message);
    },
    updateMessage(message: Bot$Message) {
      return request(requester, 'chat.update', message);
    },
    deleteMessage(message: Bot$Message) {
      return request(requester, 'chat.delete', message);
    },
    addReaction(reaction: Object) {
      return request(requester, 'reactions.add', reaction);
    },
    getUserByID(uid: string) {
      return getRequest('users.info', {
        token: config.oauth_token,
        user: uid,
      });
    },
  });
}
