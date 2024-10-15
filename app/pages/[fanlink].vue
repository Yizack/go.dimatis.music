<script setup lang="ts">
const params = useRoute("fanlink").params;

const data = fanlinksData.find(track => track.id === params.fanlink);

if (!data) {
  throw createError({
    statusCode: 404,
    message: `Page not found: '${params.fanlink}'`,
    fatal: true
  });
}

useHead({
  title: `${data.title} by ${data.artists} | Fanlinks`,
  meta: [
    { name: "description", content: data.description },
    // Protocolo Open Graph
    { property: "og:url", content: `${SITE.url}/${params.fanlink}` },
    { property: "og:type", content: "website" },
    { property: "og:title", content: `${data.title} by ${data.artists} | Fanlinks` },
    { property: "og:site_name", content: SITE.name },
    { property: "og:image", content: `${SITE.website}/images/${data.art || params.fanlink}.jpg` },
    { property: "og:image:width", content: "500" },
    { property: "og:image:height", content: "500" },
    { property: "og:image:alt", content: `${data.title} by ${data.artists} | Fanlinks` },
    { property: "og:description", content: data.description },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${SITE.website}/images/${data.art || params.fanlink}.jpg` },
    { name: "twitter:title", content: `${data.title} by ${data.artists} | Fanlinks` },
    { name: "twitter:description", content: data.description },
    { name: "twitter:site", content: SITE.twitter }
  ],
  link: [
    { rel: "canonical", href: `${SITE.url}/${params.fanlink}` }
  ],
  bodyAttrs: { id: "page-top" }
});
</script>

<template>
  <div class="bg-image" :style="`background-image: url(${SITE.website}/images/${data.art || params.fanlink}.jpg)`" />
  <div class="container text-white">
    <div class="row">
      <div class="mx-auto col-lg-4">
        <div class="card o-hidden my-3 p-0 border-dark bg-dark">
          <div class="row m-auto">
            <div class="col-lg-12 p-0">
              <!-- cover -->
              <img class="img-fluid mx-auto d-block rounded-top w-100" :src="`${SITE.website}/images/${data.art || params.fanlink}.jpg`">
              <!-- titulo -->
              <div class="p-4">
                <div class="text-center text-white">
                  <h5><b>{{ data.title }}</b></h5>
                  <h6 class="mb-0">{{ data.artists }}</h6>
                </div>
              </div>
            </div>
            <!-- related -->
            <template v-if="data.related && data.related.length">
              <template v-for="related of data.related" :key="related">
                <a class="row m-auto links text-white" :href="`/${related}`" target="_blank" :title="data.album || 'View'">
                  <div class="col-7 px-3 py-4 d-flex flex-wrap align-content-center">
                    <img class="d-block w-100" :src="`/images/related/${related}.png`">
                  </div>
                  <div class="col-5 px-0 py-4 text-center my-auto">
                    <span class="btn btn-outline-light rounded-pill px-3">View</span>
                  </div>
                </a>
              </template>
            </template>
            <!-- Stores -->
            <template v-for="(link, key) in data.fanlink.links" :key="key">
              <template v-if="link">
                <a class="row m-auto links text-white" :href="key === 'spotify' ? link + '?si' : link" target="_blank" :title="SITE.stores[key].name">
                  <div class="col-7 px-3 py-4 d-flex flex-wrap align-content-center">
                    <img class="d-block w-100" :src="SITE.stores[key].image">
                  </div>
                  <div class="col-5 px-0 py-4 text-center my-auto">
                    <span class="btn btn-outline-light rounded-pill px-3">{{ SITE.stores[key].text }}</span>
                  </div>
                </a>
              </template>
            </template>
            <!-- free download -->
            <div class="col-lg-12 mt-3 p-0">
              <div class="d-grid">
                <a class="btn btn-primary btn-lg btn-block text-white rounded-0 rounded-bottom" :href="`${SITE.website}/api/download?file=${params.fanlink}`" title="Free Download" data-bs-toggle="tooltip" data-bs-placement="right" role="button">Free Download</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto col-lg-12 socials text-center h4">
        <ul class="icons my-2 p-0">
          <li>
            <a href="https://open.spotify.com/artist/0RAT9Q5WZwzJRJgTI38zJR" target="_blank">
              <Icon name="bi:spotify" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://soundcloud.com/dimatis" target="_blank">
              <Icon name="fa6-brands:soundcloud" :class="{ 'text-dark': data.fanlink.dark }" height="2rem" width="2rem" />
            </a>
          </li>
          <li>
            <a href="https://youtube.com/dimatis" target="_blank">
              <Icon name="bi:youtube" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/dimatismusic" target="_blank">
              <Icon name="bi:twitter-x" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://facebook.com/dimatismusic" target="_blank">
              <Icon name="bi:facebook" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </a>
          </li>
          <li class="p-0">
            <a href="https://instagram.com/dimatismusic" target="_blank">
              <Icon name="bi:instagram" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </a>
          </li>
        </ul>
      </div>
      <div class="mx-auto col-lg-12 text-center h5 website">
        <a class="text-decoration-none" :class="{ 'text-dark': data.fanlink.dark }" :href="SITE.website" target="_blank" title="Website">{{ SITE.websiteDomain }}</a>
      </div>
    </div>
  </div>
</template>
