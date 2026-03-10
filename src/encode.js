export function encodeMessage(type, messageId, payload) {

  const encoder = new TextEncoder();
  const data = encoder.encode(payload);

  const buffer = new ArrayBuffer(10 + data.length);
  const view = new DataView(buffer);

  view.setUint8(0, 1);
  view.setUint8(1, type);
  view.setUint32(2, messageId);
  view.setUint32(6, data.length);

  const body = new Uint8Array(buffer);
  body.set(data, 10);

  return buffer;
}