export default function convertToBase64ShortCode(str: string) {
  return Buffer.from(str).toString("base64").substring(0, 10);
}
