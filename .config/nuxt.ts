import { SITE } from "../app/utils/site";
import fanlinksData from "../app/assets/data/all.json";

const fanlkinksRoutes = fanlinksData.map(fanlink => "/" + fanlink.id);

export default defineNuxtConfig({
  // future: { compatibilityVersion: 4 },
  app: {
    head: {
      charset: "utf-8",
      title: `${SITE.name} Fanlinks`,
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en"
      },
      meta: [
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#151515" },
        { name: "application-name", content: SITE.name },
        { name: "msapplication-TileColor", content: "#151515" },
        { name: "msapplication-TileImage", content: "/icons/mstile-144x144.png" },
        { name: "apple-mobile-web-app-title", content: SITE.name },
        { name: "apple-mobile-web-app-capable", content: SITE.name }
      ],
      link: [
        { rel: "preload", href: "/images/platforms-sprite.webp", as: "image" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "512x512", href: "/android-chrome-512x512.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-chrome-192x192.png" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#151515" }
      ]
    }
  },

  css: [
    "~/assets/scss/app.scss"
  ],

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/sitemap",
    "@nuxt/icon"
  ],

  runtimeConfig: {},

  icon: {
    mode: "svg",
    serverBundle: "remote"
  },

  eslint: {
    config: {
      autoInit: false,
      stylistic: true
    }
  },

  nitro: {
    preset: "cloudflare-pages",
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: false,
      routes: ["/", "/sitemap.xml", ...fanlkinksRoutes]
    },
    cloudflare: {
      pages: {
        routes: {
          exclude: ["/*.html", "/images/*", "/fonts/*"]
        }
      }
    }
  },

  site: {
    url: SITE.url
  },

  sitemap: {
    discoverImages: false,
    defaults: { priority: 0.8 },
    urls: [
      { loc: "/", priority: 1 }
    ],
    xslColumns: [
      { label: "URL", width: "65%" },
      { label: "Priority", select: "sitemap:priority", width: "12.5%" }
    ]
  },

  features: {
    inlineStyles: false,
    noScripts: true
  },

  experimental: {
    payloadExtraction: false,
    typedPages: true
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["mixed-decls", "color-functions", "import", "global-builtin"]
        }
      }
    }
  },

  compatibilityDate: "2025-07-16"
});
