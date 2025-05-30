import { SITE } from "../app/utils/site";
import fanlinksData from "../app/assets/data/all.json";

const fanlkinksRoutes = fanlinksData.map(fanlink => "/" + fanlink.id);

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
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
        { name: "msapplication-TileColor", content: "#da532c" },
        { name: "msapplication-TileImage", content: "/icons/mstile-144x144.png" },
        { name: "description", content: `All ${SITE.name} fanlinks in one place.` }
      ],
      link: [
        { rel: "preload", href: "/fonts/Ebrima.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
        { rel: "preload", href: "/fonts/EbrimaBd.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
        { rel: "preload", href: "/images/platforms/sprite.webp", as: "image" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-chrome-192x192.png" },
        { rel: "shortcut icon", href: `${SITE.website}/images/dimatis-logo.png` },
        { rel: "apple-touch-icon", sizes: "57x57", href: "/apple-touch-icon.png" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
        { rel: "manifest", href: "/site.webmanifest" }
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
    xslColumns: [
      { label: "URL", width: "65%" },
      { label: "Priority", select: "sitemap:priority", width: "12.5%" }
    ]
  },

  routeRules: {
    "/": { sitemap: { priority: 1 } },
    "/*/**": { sitemap: { priority: 0.8 } }
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
          api: "modern-compiler",
          silenceDeprecations: ["mixed-decls", "color-functions", "import", "global-builtin"]
        }
      }
    }
  },

  compatibilityDate: "2024-09-04"
});
