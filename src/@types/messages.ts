import { SubscriptionFilter, SubscriptionId } from './subscription'
import { Event } from './event'
import { Range } from './base'

export enum MessageType {
  REQ = 'REQ',
  EVENT = 'EVENT',
  CLOSE = 'CLOSE',
  NOTICE = 'NOTICE',
  EOSE = 'EOSE',
}

export type IncomingMessage =
  | SubscribeMessage
  | IncomingEventMessage
  | UnsubscribeMessage


export type OutgoingMessage =
  | OutgoingEventMessage
  | EndOfStoredEventsNotice
  | NoticeMessage

export type SubscribeMessage = {
  [index in Range<2, 100>]: SubscriptionFilter
} & {
  0: MessageType.REQ
  1: SubscriptionId
} & Array<SubscriptionFilter>

export type IncomingEventMessage = EventMessage & [MessageType.EVENT, Event]

export interface EventMessage {
  0: MessageType.EVENT
  1: Event
}

export interface OutgoingEventMessage {
  0: MessageType.EVENT
  1: SubscriptionId
  2: Event
}

export interface UnsubscribeMessage {
  0: MessageType.CLOSE
  1: SubscriptionId
}

export interface NoticeMessage {
  0: MessageType.NOTICE
  1: string
}

export interface EndOfStoredEventsNotice {
  0: MessageType.EOSE
  1: SubscriptionId
}
