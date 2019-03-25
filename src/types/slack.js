/* @flow */

export type Slack$VerificationToken = string;
export type Slack$TeamID = string;
export type Slack$ResponseURL = string;

export type Slack$Message = {};

export type Slack$RequestResponse = void | string | Slack$Message;

export type Slack$SharedLinkDescriptor = {|
  +url: string,
  +domain: string,
|};

export type Slack$TeamDescriptor = {|
  +id: string,
  +domain: string,
|};

export type Slack$UserDescriptor = {|
  +id: string,
  +name: string,
|};

export type Slack$ChannelDescriptor = {|
  +id: string,
  +name: string,
|};

export type Slack$ActionsDescriptor = {|
  +name: string,
  +type: 'button',
  +value: string,
|};

/*
{
    "token": "bgdsfsdfds",
    "team_id": "sdfsdf",
    "api_app_id": "sdfsdf",
    "event": {
        "type": "link_shared",
        "user": "U9VPYC2M6",
        "channel": "C9P0P6C2D",
        "message_ts": "1532496352.000038",
        "links": [
            {
                "url": "https://etherscan.io/address/0xa7a7899d944fe658c4b0a1803bab2f490bd3849e",
                "domain": "etherscan.io"
            }
        ],
        "is_app_in_channel": true
    },
    "type": "event_callback",
    "authed_teams": [
        "asdasd"
    ],
    "event_id": "asdsadsa",
    "event_time": 1532496353
}
*/
export type Slack$Event$Link = {|
  +type: 'event_callback',
  +token: Slack$VerificationToken,
  +team_id: Slack$TeamID,
  +api_app_id: string,
  +event: {
    +type: 'link_shared',
    +user: string,
    +channel: string,
    +message_ts: string,
    +links: Array<Slack$SharedLinkDescriptor>,
    +is_app_in_channel: boolean,
  },
  +authed_teams: string[],
  +event_id: string[],
  +event_time: number,
  isWorker?: true,
|};

/*
{
    "type": "dialog_submission",
    "token": "TgbAYYTEEi2pGxJ51fj6ad5R",
    "action_ts": "1532545076.840790",
    "team": {
        "id": "T1PDDLAT0",
        "domain": "auroradao"
    },
    "user": {
        "id": "U96Q77PGF",
        "name": "bradynapier"
    },
    "channel": {
        "id": "GBQCML3PX",
        "name": "privategroup"
    },
    "submission": {
        "minutes": "15",
        "privateReason": "This is a test",
        "publicReason": null
    },
    "callback_id": "support.start",
    "response_url": "https://hooks.slack.com/app/T1PDDLAT0/404287421248/y9CsLxw4dwCpSV8fTOxrELGy"
}

*/

export type Slack$Event$DialogSubmission$Submission = {
  [inputID: string]: any,
};

export type Slack$Event$DialogSubmission = {|
  +type: 'dialog_submission',
  +token: Slack$VerificationToken,
  +action_ts: string,
  +team: Slack$TeamDescriptor,
  +user: Slack$UserDescriptor,
  +channel: Slack$ChannelDescriptor,
  +submission: Slack$Event$DialogSubmission$Submission,
  +callback_id: string,
  +response_url: string,
  state?: any,
  isWorker?: true,
|};

/*
  If your app finds any errors with the submission, respond
  with an application/json payload within the body of a 200
  OK response - the requests between your app and Slack are
  still OK after all, so don't use any kind of error response.

  This payload should be an errors array containing 1 or more
  objects that include:

  name  - a string which specifies the corresponding dialog
          element that is being rejected. This must match the
          name used to create that element.
  error - a string which describes why that element is being
          rejected.
*/
export type Slack$Event$DialogSubmission$ValidationErrorResponse = {|
  errors: Array<{|
    name: string,
    error: string,
  |}>,
|};

export type Slack$Event$UrlVerification = {|
  +type: 'url_verification',
  +challenge: string,
  isWorker?: true,
|};

/*
{
    "type": "interactive_message",
    "actions": [
        {
            "name": "support.start.accept",
            "type": "button",
            "value": "support.start.accept"
        }
    ],
    "callback_id": "support.start",
    "team": {
        "id": "T1PDDLAT0",
        "domain": "auroradao"
    },
    "channel": {
        "id": "GBQCML3PX",
        "name": "privategroup"
    },
    "user": {
        "id": "U96Q77PGF",
        "name": "bradynapier"
    },
    "action_ts": "1532545100.281141",
    "message_ts": "1532545077.000137",
    "attachment_id": "1",
    "token": "TgbAYYTEEi2pGxJ51fj6ad5R",
    "is_app_unfurl": false,
    "original_message": {
        "type": "message",
        "user": "UBMHKKN90",
        "text": "",
        "bot_id": "BBMHKKN74",
        "attachments": [
            {
                "callback_id": "support.start",
                "fallback": "A maitenance window is being requested.",
                "text": "Before the window starts, at least one support member must acknowledge.  This should be done once we have prepared the public for the window.",
                "pretext": " A maitenance window is being requested.",
                "title": "Starting Maitenance Window!",
                "footer": "King IDEX",
                "id": 1,
                "color": "daa038",
                "fields": [
                    {
                        "title": "Timeframe",
                        "value": "15 Minutes",
                        "short": true
                    },
                    {
                        "title": "Private Reason",
                        "value": "This is a test",
                        "short": false
                    },
                    {
                        "title": "Public Reason",
                        "value": "Ask if more details are required",
                        "short": false
                    }
                ],
                "actions": [
                    {
                        "id": "1",
                        "name": "support.start.acknowledge",
                        "text": "Acknowledge Window",
                        "type": "button",
                        "value": "support.start.acknowledge",
                        "style": "primary"
                    },
                    {
                        "id": "2",
                        "name": "support.start.accept",
                        "text": "Accept Window",
                        "type": "button",
                        "value": "support.start.accept",
                        "style": "primary",
                        "confirm": {
                            "text": "This will indicate that the team can turn off trades, withdrawals, etc.  Are you ready?",
                            "title": "Are you sure?",
                            "ok_text": "Yes",
                            "dismiss_text": "No"
                        }
                    }
                ]
            }
        ],
        "ts": "1532545077.000137"
    },
    "response_url": "https://hooks.slack.com/actions/T1PDDLAT0/404759877060/I0qn40OIJvlc2HlMZkxInrOg",
    "trigger_id": "405141552117.57455690918.f6eb3dbc11c2060d200381da4bd4f7a0"
}
*/

export type Slack$Event$InteractiveMessage = {|
  +type: 'interactive_message',
  +token: Slack$VerificationToken,
  +actions: Array<Slack$ActionsDescriptor>,
  +callback_id: string,
  +team: Slack$TeamDescriptor,
  +channel: Slack$ChannelDescriptor,
  +user: Slack$UserDescriptor,
  +action_ts: string,
  +message_ts: string,
  +attachment_id: string,
  +is_app_unfurl: boolean,
  +original_message: Slack$Message,
  +response_url: Slack$ResponseURL,
  +trigger_id: string,
  isWorker?: true,
|};

/*
  A list of options can be loaded from an external URL and
  used in your dialog menus.

  @see https://api.slack.com/dialogs#elements
{
  "type": "dialog_suggestion",
  "token": "W3VDvuzi2nRLsiaDOsmJranO",
  "action_ts": "1528203589.238335",
  "team": {
    "id": "T24BK35ML",
    "domain": "hooli-hq"
  },
  "user": {
    "id": "U900MV5U7",
    "name": "gbelson"
  },
  "channel": {
    "id": "C012AB3CD",
    "name": "triage-platform"
  },
  "name": "external_data",
  "value": "",
  "callback_id": "bugs"
}
*/
export type Slack$Event$DialogOptions = {|
  +type: 'dialog_suggestion',
  +name: 'external_data',
  +token: Slack$VerificationToken,
  +action_ts: string,
  +team: Slack$TeamDescriptor,
  +user: Slack$UserDescriptor,
  +channel: Slack$ChannelDescriptor,
  +value: string,
  +callback_id: string,
  isWorker?: true,
|};

/*
{
    "token": "TgbAYYTEEi2pGxJ51fj6ad5R",
    "team_id": "T1PDDLAT0",
    "team_domain": "auroradao",
    "channel_id": "GBQCML3PX",
    "channel_name": "privategroup",
    "user_id": "U96Q77PGF",
    "user_name": "bradynapier",
    "command": "/idex",
    "text": "support start",
    "response_url": "https://hooks.slack.com/commands/T1PDDLAT0/404868143699/q5EbnmcIyQFJ77l1Fjmzcr2D",
    "trigger_id": "406322073990.57455690918.8c8f26a118ac7070533948a3fd6d7f0d"
}
*/

export type Slack$Command$Slash = {|
  +type?: void,
  +token: Slack$VerificationToken,
  +team_id: Slack$TeamID,
  +team_domain: string,
  +channel_id: string,
  +channel_name: string,
  +user_id: string,
  +user_name: string,
  +command: string,
  +text: string,
  +response_url: Slack$ResponseURL,
  +trigger_id: string,
  isWorker?: true,
|};

/*
  It is not currently clear when this will occur, but the various
  slack libraries implement this logic so we do as well.

  In the libs they return this as the value without looking at
  any other data when they discover a payload in the object.

  @see https://github.com/slackapi/node-slack-interactive-messages/blob/master/src/http-handler.js#L45
*/
export type Slack$Payload$String = {|
  +payload: string,
|};

export type Slack$Payloads =
  | Slack$Command$Slash
  | Slack$Event$Link
  | Slack$Event$DialogSubmission
  | Slack$Event$InteractiveMessage
  | Slack$Event$UrlVerification;

// export type Slack$Payloads = Slack$Events;
