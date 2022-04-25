export default function checkYoutubeAndChangeToEmbedUrl(url: string) {
  if (url && url.includes('youtube')) {
    return url.replace('watch?v=', 'embed/');
  }

  return url;
}
