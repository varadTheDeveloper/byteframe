import { decode } from "./decode.js";

let buffer = new Uint8Array(0);

export function streamingDecoder(chunk) {

  const merged = new Uint8Array(buffer.length + chunk.length);

  merged.set(buffer);
  merged.set(chunk, buffer.length);

  buffer = merged;

  const messages = [];

  while (buffer.length >= 10) {

    const view = new DataView(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength
    );

    const payloadLength = view.getUint32(6);
    const totalLength = 10 + payloadLength;

    if (buffer.length < totalLength) {
      break;
    }

    const messageBytes = buffer.slice(0, totalLength);
    const message = decode(messageBytes.buffer);

    messages.push(message);

    buffer = buffer.slice(totalLength);
  }

  return messages;
}