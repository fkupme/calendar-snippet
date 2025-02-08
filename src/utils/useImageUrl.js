export default function useImageUrl(link) {
  return new URL(link, import.meta.url).href;
}
