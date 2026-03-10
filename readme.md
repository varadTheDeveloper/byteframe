README.md
# Byteframe

A lightweight binary streaming protocol encoder and decoder for JavaScript.

Byteframe helps you build efficient message-based communication over
TCP, WebSocket, or any byte stream.

It provides:

- Binary message encoding
- Binary message decoding
- Streaming parser for partial TCP/WebSocket data

---

## Protocol Structure

Each message uses a **10-byte header** followed by the payload.

HEADER

| Field | Size |
|------|------|
version | 1 byte |
message type | 1 byte |
message id | 4 bytes |
payload length | 4 bytes |

BODY

payload → UTF-8 string

Example message layout:


[ version ][ type ][ messageId ][ payloadLength ][ payload ]


---

## Installation


npm install byteframe


---

## Usage

### Import


import { encodeMessage, decode, streamingDecoder } from "byteframe"


---

## Encoding a Message


const buffer = encodeMessage(1, 1001, "hello world")


This returns an **ArrayBuffer** containing the binary message.

---

## Decoding a Message


const message = decode(buffer)

console.log(message)


Output:


{
version: 1,
type: 1,
messageId: 1001,
payload: "hello world"
}


---

## Streaming Decoder (TCP / WebSocket)

Network streams may deliver data in chunks.

Example chunks:


chunk1 → partial message
chunk2 → rest of message


Use the streaming decoder:


const messages = streamingDecoder(chunk)

for (const msg of messages) {
console.log(msg)
}


It automatically:

- buffers incoming bytes
- detects complete messages
- returns decoded messages

---

## Example Workflow


const buffer = encodeMessage(1, 123, "hello")

// send buffer over TCP/WebSocket

const messages = streamingDecoder(chunk)


---

## Features

- Efficient binary protocol
- Length-prefixed message framing
- Handles partial TCP packets
- Works in Node.js and browsers
- Minimal and dependency-free

---

## License

MIT License

Copyright (c) 2026 Varad Modhekar