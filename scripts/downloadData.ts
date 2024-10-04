import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { $fetch } from "ofetch";
import { SITE } from "../app/utils/site";

const dataDir = fileURLToPath(new URL("./../app/assets/data", import.meta.url));

const [tracks, albums] = await Promise.all([
  $fetch<DimatisTrack[]>(`${SITE.website}/data/tracks.json`),
  $fetch<DimatisAlbum[]>(`${SITE.website}/data/albums.json`)
]).catch((error) => {
  console.warn(error);
  process.exit(1);
});

await mkdir(dataDir, { recursive: true }).catch((e) => {
  console.warn(e);
  process.exit(1);
});

const data: Partial<(DimatisTrack | DimatisAlbum)>[] = tracks.map((track) => {
  return {
    id: track.id,
    artists: track.artists,
    title: track.title,
    description: track.description,
    date: track.date,
    cover: track.cover,
    album: track.album,
    dropbox: track.dropbox,
    fanlink: track.fanlink
  };
});

const albumsData: Partial<DimatisAlbum>[] = albums.reduce((acc = [], value) => {
  if (value.type === "Album" || value.type === "EP") {
    acc.push({
      id: value.cover,
      artists: value.artists,
      title: `${value.title} (${value.type})`,
      description: value.description,
      date: value.date,
      cover: value.cover,
      type: value.type,
      dropbox: value.dropbox,
      fanlink: value.fanlink
    });
  }
  return acc;
}, [] as Partial<DimatisAlbum>[]);

data.push(...albumsData);

const sorted: Partial<(DimatisTrack | DimatisAlbum)>[] = data.sort((a, b) => {
  if (!a.date || !b.date) return 0;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

await writeFile(`${dataDir}/all.json`, JSON.stringify(sorted, null, 2)).catch((e) => {
  console.warn(e);
  process.exit(1);
});
