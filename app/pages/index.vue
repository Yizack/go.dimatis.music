<template>
  <div class="bg-image" :style="`background-image: url('${SITE.website}/${SITE.background}')`" />
  <div class="container text-white">
    <div class="row">
      <div v-for="(fanlink, key) in fanlinksData" :key="key" class="mx-auto col-lg-4">
        <div class="card o-hidden my-3 p-0 border-dark bg-dark">
          <div class="row">
            <div class="col-lg-12">
              <!-- cover -->
              <img class="img-fluid mx-auto d-block rounded-top w-100" :src="`${SITE.website}/images/${fanlink.art || fanlink.id}.jpg`">
              <!-- titulo -->
              <div class="p-3">
                <div class="text-center text-white">
                  <h5><b>{{ fanlink.title }}</b></h5>
                  <h6>{{ fanlink.artists }}</h6>
                  <p class="text-secondary mb-0" title="Release date">{{ formatDate(fanlink.date) }}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="d-grid">
                <NuxtLink :to="`/${fanlink.id}`" type="button" class="btn btn-primary btn-lg btn-block text-white rounded-0 rounded-bottom" title="View Fanlink">View</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto col-lg-12 socials text-center h4">
        <ul class="icons my-2 p-0">
          <li>
            <a href="https://open.spotify.com/artist/0RAT9Q5WZwzJRJgTI38zJR" target="_blank">
              <Icon name="bi:spotify" size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://soundcloud.com/dimatis" target="_blank">
              <Icon name="fa6-brands:soundcloud" height="2rem" width="2rem" />
            </a>
          </li>
          <li>
            <a href="https://youtube.com/dimatis" target="_blank">
              <Icon name="bi:youtube" size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/dimatismusic" target="_blank">
              <Icon name="bi:twitter-x" size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://facebook.com/dimatismusic" target="_blank">
              <Icon name="bi:facebook" size="1.5rem" />
            </a>
          </li>
          <li class="p-0">
            <a href="https://instagram.com/dimatismusic" target="_blank">
              <Icon name="bi:instagram" size="1.5rem" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="mx-auto col-lg-12 text-center h5 website">
      <a class="text-decoration-none" :href="SITE.domain" target="_blank" title="Website">{{ SITE.websiteDomain }}</a>
    </div>
  </div>
</template>
