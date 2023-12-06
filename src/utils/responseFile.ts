import type { DefaultContext } from "koa";

const responseFile =
  (ctx: DefaultContext) =>
  (filename: string, contentType: string) =>
  (file: NodeJS.WritableStream | NodeJS.ReadableStream | Buffer) => {
    ctx.response.set("content-disposition", `attachment; filename=${filename}`);
    ctx.response.set("content-type", contentType);
    ctx.body = file;
  };

export default responseFile;
