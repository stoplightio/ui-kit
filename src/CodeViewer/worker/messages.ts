import type { RefractorNode } from 'refractor/core';

interface WorkerMessageEvent<T> extends Omit<MessageEvent, 'data'> {
  data: T;
}

export type ParseCodeRequestPayload = {
  instanceId: string;
  code: string;
  language: string;
  showLineNumbers: boolean;
};

export type ParseCodeResponse = ParseCodeSuccessResponse | ParseCodeErrorResponse;

export type ParseCodeSuccessResponse = {
  error: null;
  nodes: RefractorNode[];
};

export type ParseCodeErrorResponse = {
  error: string;
  nodes: null;
};

export const isParseCodeResponseMessage = (message: MessageEvent): message is WorkerMessageEvent<ParseCodeResponse> =>
  'nodes' in message.data;

export const isParseCodeRequestMessage = (
  message: MessageEvent,
): message is WorkerMessageEvent<ParseCodeRequestPayload> => 'code' in message.data;
