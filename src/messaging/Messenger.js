/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict';
import {
    Platform,
    NativeModules,
    NativeEventEmitter,
    DeviceEventEmitter,
} from 'react-native';
import MessagingShared from "./MessagingShared";
import MessengerEventTypes from "./MessengerEventTypes";

const MessagingModule = NativeModules.VIMessagingModule;

const listeners = {};

const EventEmitter = Platform.select({
    ios: new NativeEventEmitter(MessagingModule),
    android: DeviceEventEmitter,
});

/**
 * @memberOf Voximplant.Messaging
 * @class Messenger
 * @classdesc Messenger class used to control messaging functions.
 */
export default class Messenger {

    /**
     * @private
     */
    static _instance = null;

    /**
     * @ignore
     */
    constructor() {
        if (Messenger._instance) {
            throw new Error("Error - use Voximplant.getMessenger()");
        }
        EventEmitter.addListener('VIGetUser', this._onGetUser);
        EventEmitter.addListener('VISetStatus', this._onSetStatus);
        EventEmitter.addListener('VISubscribe', this._onSubscribe);
        EventEmitter.addListener('VIUnsubscribe', this._onUnsubscribe);
        EventEmitter.addListener('VIEditUser', this._onEditUser);
        EventEmitter.addListener('VIGetConversation', this.onGetConversation);
        EventEmitter.addListener('VICreateConversation', this._onCreateConversation);
        EventEmitter.addListener('VIRemoveConversation', this._onRemoveConversation);
    }

    // init() {}

    /**
     *  @ignore
     */
    static getInstance() {
        if (Messenger._instance === null) {
            Messenger._instance = new Messenger();
        }
        return Messenger._instance;
    }

    /**
     *
     * @param eventType
     * @param event
     */
    on(eventType, event) {
        if (!listeners[eventType]) {
            listeners[eventType] = new Set();
        }
        listeners[eventType].add(event);
    }

    /**
     *
     * @param eventType
     * @param event
     */
    off(eventType, event) {
        if (listeners[eventType]) {
            listeners[eventType].delete(event);
        }
    }

    /**
     * Get the full Voximplant user identifier, for example 'username@appname.accname', for the current user
     * @return string
     * @memberOf Voximplant.Messaging.Messenger
     */
    getMe() {
        return MessagingShared.getInstance().getCurrentUser();
    }

    /**
     *
     * @param userId
     */
    getUser(userId) {
        MessagingModule.getUser(userId);
    }

    /**
     *
     * @param users
     */
    getUsers(users) {
        MessagingModule.getUsers(users);
    }

    editUser(customData, privateCustomData) {
        MessagingModule.editUser(customData, privateCustomData);
    }

    /**
     *
     * @param online
     */
    setStatus(online) {
        MessagingModule.setStatus(online);
    }

    /**
     *
     * @param users
     */
    subscribe(users) {
        MessagingModule.subscribe(users)
    }

    /**
     *
     * @param users
     */
    unsubscribe(users) {
        MessagingModule.unsubscribe(users);
    }

    /**
     *
     * @param notifications
     */
    managePushNotifications(notifications) {
        MessagingModule.manageNotifications(notifications);
    }

    /**
     *
     * @param participants
     * @param title
     * @param distinct
     * @param publicJoin
     * @param customData
     * @param moderators
     * @param isUber
     */
    createConversation(participants, title, distinct, publicJoin, customData, moderators, isUber) {
        if (title === undefined) {
            title = null;
        }
        if (distinct === undefined) {
            distinct = false;
        }
        if (publicJoin === undefined) {
            publicJoin = false;
        }
        if (customData === undefined) {
            customData = null;
        }
        if (moderators === undefined) {
            moderators = null;
        }
        if (isUber === undefined) {
            isUber = false;
        }
        MessagingModule.createConversation(participants, title, distinct, publicJoin, customData, moderators, isUber);
    }

    /**
     *
     * @param uuid
     */
    getConversation(uuid) {
       if (uuid === undefined) {
           uuid = null;
       }
       MessagingModule.getConversation(uuid);
    }

    /**
     *
     * @param conversations
     */
    getConversations(conversations) {
        if (conversations === undefined) {
            conversations = [];
        }
        MessagingModule.getConversations(conversations);
    }

    removeConversation(uuid) {
        if (uuid === undefined) {
            uuid = null;
        }
        MessagingModule.removeConversation(uuid);
    }

    /**
     * @private
     */
    _emit(event, ...args) {
        const handlers = listeners[event];
        if (handlers) {
            for (const handler of handlers) {
                handler(...args);
            }
        }
    }

    _onGetUser = (event) => {
        this._emit(MessengerEventTypes.GetUser, event);
    };

    _onSetStatus = (event) => {
        this._emit(MessengerEventTypes.SetStatus, event);
    };

    _onSubscribe = (event) => {
        this._emit(MessengerEventTypes.Subscribe, event);
    };

    _onUnsubscribe = (event) => {
        this._emit(MessengerEventTypes.Unsubscribe, event);
    };

    _onEditUser = (event) => {
        this._emit(MessengerEventTypes.EditUser, event);
    };

    _onCreateConversation = (event) => {
        this._emit(MessengerEventTypes.CreateConversation, event);
    };

    onGetConversation = (event) => {
        this._emit(MessengerEventTypes.GetConversation, event);
    };

    _onRemoveConversation = (event) => {
        this._emit(MessengerEventTypes.RemoveConversation, event);
    }
}