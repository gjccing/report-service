import type { Middleware } from "koa";

export default <Middleware>(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    ctx.body = `${err}`;
    console.error(err);
  }
});
