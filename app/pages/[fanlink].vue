<script setup lang="ts">
const params = useRoute("fanlink").params;

const data = fanlinksData.find(track => track.id === params.fanlink);

if (!data) {
  throw createError({
    statusCode: 404,
    message: `Page not found: '${params.fanlink}'`
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
  ]
});

const getSpritePercent = (position: number) => {
  const spriteHeight = 150;
  const totalPlatforms = Object.keys(SITE.platforms).length;
  const positionY = (position - 1) * spriteHeight / (totalPlatforms * spriteHeight - spriteHeight) * 100;
  return positionY;
};
</script>

<template>
  <div class="bg-image" :style="`background-image: url(${SITE.website}/images/${data.art || params.fanlink}.jpg)`" />
  <div class="container text-white">
    <div class="row">
      <div class="mx-auto col-lg-4">
        <div class="card overflow-hidden my-3 p-0 border-dark bg-dark shadow">
          <div class="row m-auto">
            <div class="col-lg-12 p-0">
              <!-- cover -->
              <img class="img-fluid mx-auto d-block rounded-top w-100" :src="`${SITE.website}/images/${data.art || params.fanlink}.jpg`" :alt="`${data.title} by ${data.artists} | Cover Art`" width="500" height="500">
              <!-- titulo -->
              <div class="p-4">
                <div class="text-center text-white">
                  <h5><b>{{ data.title }}</b></h5>
                  <h6>{{ data.artists }}</h6>
                  <p class="text-secondary mb-0" title="Release date">{{ formatDate(data.date) }}</p>
                </div>
              </div>
            </div>
            <!-- related -->
            <template v-if="data.related && data.related.length">
              <template v-for="related of data.related" :key="related">
                <NuxtLink class="row m-auto links text-white" :to="`/${related}`" :title="data.album || 'View'">
                  <div class="col-7 px-3 py-4 d-flex flex-wrap align-content-center">
                    <img class="d-block w-100" :src="`/images/related/${related}.png`" :alt="related">
                  </div>
                  <div class="col-5 px-0 py-4 text-center my-auto">
                    <span class="btn btn-outline-light rounded-pill px-3">View</span>
                  </div>
                </NuxtLink>
              </template>
            </template>
            <!-- Platforms -->
            <template v-for="(link, key) in data.fanlink.links" :key="key">
              <template v-if="link">
                <NuxtLink class="row m-auto links text-white" :to="key === 'spotify' ? link + '?si' : link" target="_blank" :title="SITE.platforms[key].name">
                  <div class="col-7 px-3 py-4 d-flex flex-wrap align-content-center">
                    <div class="sprite-container">
                      <div class="sprite-image" :style="{ backgroundPositionY: getSpritePercent(SITE.platforms[key].sprite) + '%' }" :alt="`${SITE.platforms[key].name} on ${SITE.platforms[key].text}`" />
                    </div>
                  </div>
                  <div class="col-5 px-0 py-4 text-center my-auto">
                    <span class="btn btn-outline-light rounded-pill px-3">{{ SITE.platforms[key].text }}</span>
                  </div>
                </NuxtLink>
              </template>
            </template>
            <!-- free download -->
            <div class="col-lg-12 mt-3 p-0">
              <div class="d-grid">
                <NuxtLink class="btn btn-light btn-lg btn-block rounded-0 fw-bold" :to="`${SITE.website}/api/download?file=${params.fanlink}`" title="Free Download" data-bs-toggle="tooltip" data-bs-placement="right" role="button">Free Download</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto col-lg-12 socials text-center h4">
        <ul class="icons my-2 p-0">
          <li>
            <NuxtLink to="https://open.spotify.com/artist/0RAT9Q5WZwzJRJgTI38zJR" target="_blank" title="Spotify">
              <Icon name="bi:spotify" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://soundcloud.com/dimatis" target="_blank" title="Soundcloud">
              <Icon name="fa6-brands:soundcloud" :class="{ 'text-dark': data.fanlink.dark }" height="2rem" width="2rem" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://youtube.com/dimatis" target="_blank" title="YouTube">
              <Icon name="bi:youtube" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://x.com/dimatismusic" target="_blank" title="X (Twitter)">
              <Icon name="bi:twitter-x" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://facebook.com/dimatismusic" target="_blank" title="Facebook">
              <Icon name="bi:facebook" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </NuxtLink>
          </li>
          <li class="p-0">
            <NuxtLink to="https://instagram.com/dimatismusic" target="_blank" title="Instagram">
              <Icon name="bi:instagram" :class="{ 'text-dark': data.fanlink.dark }" size="1.5rem" />
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="mx-auto col-lg-12 text-center h5 website">
        <NuxtLink class="text-decoration-none" :class="{ 'text-dark': data.fanlink.dark }" :to="SITE.website" target="_blank" title="Website">{{ SITE.websiteDomain }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
