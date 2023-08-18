import { TOKEN_KEY, TOKEN_TTL_MS } from './Constants.js';

function setToken(access_token) {
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      value: access_token,
      timeStamp: new Date().getTime(),
    })
  );
}
function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
function getToken() {
  let result = null;

  const storedToken = localStorage.getItem(TOKEN_KEY);
  storedToken && (result = JSON.parse(storedToken));

  return result;
}
function isExpired(timeStamp) {
  if (!timeStamp) return false;

  const now = new Date().getTime();
  const diff = now - timeStamp;

  return diff > TOKEN_TTL_MS;
}
export { getToken, setToken, removeToken, isExpired };
