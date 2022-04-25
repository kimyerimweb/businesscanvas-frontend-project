export default function checkExistenceOfScheme(url: string) {
  if (url && (url.indexOf('http://') === 0 || url.indexOf('https://') === 0)) {
    return true;
  }

  return false;
}
