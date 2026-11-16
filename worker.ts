// @ts-expect-error `.open-next/worker.js` is generated at build time
import { default as handler } from "./.open-next/worker.js";
import { processBookingOutbox, type OutboxEnv } from "./src/lib/booking-outbox";

const APEX_HOST = "cleaningkissimmee.com";

export default {
  async fetch(
    request: Request,
    env: OutboxEnv,
    ctx: { waitUntil: (promise: Promise<unknown>) => void },
  ) {
    const url = new URL(request.url);
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const isWww = url.hostname === `www.${APEX_HOST}`;
    const isHttp = url.protocol === "http:" || forwardedProto === "http";

    if (isWww || isHttp) {
      url.hostname = APEX_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    return handler.fetch(request, env, ctx);
  },

  async scheduled(
    _controller: unknown,
    env: OutboxEnv,
    ctx: { waitUntil: (promise: Promise<unknown>) => void },
  ) {
    ctx.waitUntil(processBookingOutbox(env));
  },
};

// Required when using OpenNext DO queue / tag cache (harmless if unused).
// @ts-expect-error generated at build time
export { DOQueueHandler, DOShardedTagCache } from "./.open-next/worker.js";
