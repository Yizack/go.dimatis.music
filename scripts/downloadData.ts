import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { $fetch } from "ofetch";
import { SITE } from "../app/utils/site";

const dataDir = fileURLToPath(new URL("./../app/assets/data", import.meta.url));

console.info("Downloading fanlinks data...");

// Download tracks and albums public data
const [tracks, albums] = await Promise.all([
  $fetch<DimatisTrack[]>(`${SITE.website}/data/tracks.json`),
  $fetch<DimatisAlbum[]>(`${SITE.website}/data/albums.json`)
]).catch((error) => {
  console.warn(error);
  process.exit(1);
});

// Create ./app/assets/data directory if it doesn't exist
await mkdir(dataDir, { recursive: true }).catch((e) => {
  console.warn(e);
  process.exit(1);
});

// Prepare track data
const data: Partial<(DimatisTrack | DimatisAlbum)>[] = tracks.map((track) => {
  return {
    id: track.id,
    artists: track.artists,
    title: track.title,
    description: track.description,
    date: track.date,
    art: track.art,
    related: track.related,
    album: track.album,
    dropbox: track.dropbox,
    fanlink: track.fanlink
  };
});

// Prepare album data
const albumsData: Partial<DimatisAlbum>[] = albums.reduce((acc = [], value) => {
  if (value.type === "Album" || value.type === "EP") {
    acc.push({
      id: value.id + "-" + value.type.toLowerCase(),
      artists: value.artists,
      title: `${value.title} (${value.type})`,
      description: value.description,
      date: value.date,
      art: value.art,
      type: value.type,
      dropbox: value.dropbox,
      fanlink: value.fanlink
    });
  }
  return acc;
}, [] as Partial<DimatisAlbum>[]);

// Merge track and album data
data.push(...albumsData);

// Sort data by date
const sortedData: Partial<(DimatisTrack | DimatisAlbum)>[] = data.sort((a, b) => {
  if (!a.date || !b.date) return 0;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// Write data to ./app/assets/data/all.json
await writeFile(`${dataDir}/all.json`, JSON.stringify(sortedData)).catch((e) => {
  console.warn(e);
  process.exit(1);
});

console.info(`Downloaded a length of ${sortedData.length} fanlinks data to ./app/assets/data/all.json`);
