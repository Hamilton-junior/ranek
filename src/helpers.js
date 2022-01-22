export function serialize(obj) {
  let queryString = '';
  for (let key in obj) {
    queryString += `&${key}=${this.obj[key]}`;
  }
  return queryString;
}
