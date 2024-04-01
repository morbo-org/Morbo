import { setCacheNameDetails } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

if (DEV_MODE) {
  self.addEventListener("activate", () => void self.clients.claim());
  self.addEventListener("install", () => void self.skipWaiting());
}

setCacheNameDetails({
  prefix: "",
  suffix: "",
  precache: "precache",
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  /\/assets\//,
  new CacheFirst({
    cacheName: "assets",
    plugins: [
      // @ts-expect-error Upstream issue: https://github.com/GoogleChrome/workbox/issues/3141
      new ExpirationPlugin({
        maxEntries: NUMBER_OF_ASSETS * 3,
        purgeOnQuotaError: true,
      }),
    ],
  }),
  "GET",
);