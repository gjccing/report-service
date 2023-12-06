import type { Middleware } from "koa";
import parseParams from "../utils/parseParams";
import fetchAllOrders from "../utils/fetchAllOrders";

export default <Middleware>(async (ctx, next) => {
  await Promise.resolve(parseParams(ctx.query))
    .then(fetchAllOrders)
    .then((orders) => (ctx.body = JSON.stringify(orders)))
    .then(next);
});
