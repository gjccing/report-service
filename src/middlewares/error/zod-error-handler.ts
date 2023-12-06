import type { Middleware } from "koa";
import { ZodError } from "zod";

export default <Middleware>(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ZodError) {
      ctx.status = 400;
      ctx.body = error;
    } else throw error;
  }
});
