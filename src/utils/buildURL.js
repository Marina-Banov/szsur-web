export function buildURL(api, path) {
  return api + path;
}

export function buildURLFromParams(path, ...params) {
  params.reverse();
  return path.replace(/(:\w+)/g, () => params.pop());
}
