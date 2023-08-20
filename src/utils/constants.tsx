export const BASE_URL = "http://localhost:8000/api/deezer/track";
export const BASE_URL_ALBUM = "http://localhost:8000/api/deezer/album";

export interface ListTracksProps {
  songTitle: string;
  artistName: string;
  duration: string;
  image: string;
  albumTitle: string;
  preview: string;
  trackList: string;
}
