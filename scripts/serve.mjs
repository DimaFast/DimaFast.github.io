import { createServer } from "node:http";
import serve from "serve-handler";

const host = process.env.HOST ?? "127.0.0.1";
const port = Number(process.env.PORT ?? 3000);
const server = createServer((request, response) => {
  void serve(request, response, { public: "out", trailingSlash: true });
});

server.listen(port, host, () => {
  console.log(`http://${host}:${server.address().port}`);
});
