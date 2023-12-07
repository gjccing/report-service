import fs from "node:fs";

const modulePath = process.env.INJECT_MODULE ?? "";

const code = fs.readFileSync("./solution/shellForRedirection.ts").toString();
const newCode = code
  .split("\n")
  .map((line) =>
    /^\/\/ inject-line/.test(line)
      ? line.replace(/<inject-file-path>/g, modulePath)
      : line
  )
  .map((line) => line.replace(/^\/\/ inject-line /, ""))
  .join("\n");

fs.writeFileSync("./src/index.ts", newCode);
