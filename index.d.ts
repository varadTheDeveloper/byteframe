export function encodeMessage(
  type: number,
  messageId: number,
  payload: string
): ArrayBuffer;

export function decode(buffer: ArrayBuffer): {
  version: number;
  type: number;
  messageId: number;
  payload: string;
};

export function streamingDecoder(chunk: Uint8Array): Array<{
  version: number;
  type: number;
  messageId: number;
  payload: string;
}>;