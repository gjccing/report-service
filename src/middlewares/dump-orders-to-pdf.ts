import type { Middleware } from "koa";
import parseParams from "../utils/parseParams";
import fetchAllOrders from "../utils/fetchAllOrders";
import generatePDFStream from "../utils/generatePDFStream";
import responseFile from "../utils/responseFile";
import convertToBase64ShortCode from "../utils/convertToBase64ShortCode";

export default <Middleware>(async (ctx) => {
  await Promise.resolve(parseParams(ctx.query))
    .then(fetchAllOrders)
    .then(generatePDFStream)
    .then(
      responseFile(ctx)(
        `${convertToBase64ShortCode(ctx.querystring)}.pdf`,
        "application/octet-stream"
      )
    );
});
