import { encodeMessage, streamingDecoder } from "byteframe";

const buffer = encodeMessage(1, 42, "hello");

const chunk = new Uint8Array(buffer);

const messages = streamingDecoder(chunk);

console.log(messages);