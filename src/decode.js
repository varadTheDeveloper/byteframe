export function decode(buffer) {

  const view = new DataView(buffer);

  const version = view.getUint8(0);
  const type = view.getUint8(1);
  const messageId = view.getUint32(2);
  const length = view.getUint32(6);

  const payloadBytes = new Uint8Array(buffer, 10, length);

  const decoder = new TextDecoder();
  const payload = decoder.decode(payloadBytes);

  return {
    version,
    type,
    messageId,
    payload
  };
}