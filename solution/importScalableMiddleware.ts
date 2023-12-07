import type { Middleware } from "koa";
import child_process from "node:child_process";
import path from "path";
import proxy from "koa-better-http-proxy";

function isUrl(s: string) {
  var regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}

export default function importScalableMiddleware(
  modulePath: string
): Middleware {
  let proxyMiddleware: Middleware | undefined = undefined;
  const docker_build = child_process.spawn("bash", [
    path.join(__dirname, "build-a-container-pool.sh"),
    modulePath,
    modulePath.substring(1).replace(/\//g, "_").toLowerCase(),
  ]);
  docker_build.stdout.on("data", (data) => {
    console.log(`${modulePath}:stdout:\n ${data}`);

    const message: string = data.toString().trim();
    if (isUrl(message)) {
      setTimeout(() => {
        proxyMiddleware = proxy(message, {});
        console.log(`${modulePath}:\n cluster is ready\n`);
      }, 5000);
    }
  });
  docker_build.stderr.on("data", (data) => {
    console.error(`${modulePath}:stderr:\n ${data}`);
  });
  const apiPath = path.join(process.env.PWD || "", modulePath);
  return async (ctx, next) => {
    if (proxyMiddleware !== undefined) {
      return await proxyMiddleware(ctx, next);
    } else {
      return await require(apiPath).default(ctx, next);
    }
  };
}
