import { C2sInit, C2sSendMessage, S2cBroadcastMessage, S2cHistory, S2cSessionCreated } from "./types/chat";
export declare const isC2sInit: (msg: unknown) => msg is C2sInit;
export declare const isC2sSendMessage: (msg: unknown) => msg is C2sSendMessage;
export declare const isS2cSessionCreated: (msg: unknown) => msg is S2cSessionCreated;
export declare const isS2cComplete: (msg: unknown) => msg is S2cHistory;
export declare const isS2cBroadcastMessage: (msg: unknown) => msg is S2cBroadcastMessage;
