import Koa from "koa";
import logger from "koa-logger";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = new Koa();
app.use(logger());
// inject-line app.use(require(path.join(process.env.PWD || "", "<inject-file-path>")).default);
app.listen(3000);
