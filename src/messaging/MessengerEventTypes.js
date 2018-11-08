/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict';
/**
 * @memberOf Voximplant.Messaging
 * @type {{GetUser: string}}
 */
const MessengerEventTypes = {
    CreateConversation : 'CreateConversation',
    EditConversation: 'EditConversation',
    EditMessage: 'EditMessage',
    EditUser : 'EditUser',
    GetConversation : 'GetConversation',
    GetUser : 'GetUser',
    RemoveConversation : 'RemoveConversation',
    SendMessage : 'SendMessage',
    SetStatus : 'SetStatus',
    Subscribe : 'Subscribe',
    Typing : 'Typing',
    Unsubscribe : 'Unsubscribe'
};

export default MessengerEventTypes;