const TokenKey = 'Admin-Token'
const RefreshTokenKey="refreshToken"

export const TokenName = 'Authorization'
export const RefreshTokenName = 'refreshAuthorization'

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);

}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}

export function getRefreshToken() {
  return sessionStorage.getItem(RefreshTokenKey);

}

export function setRefreshToken(_RefreshToken) {
  return sessionStorage.setItem(RefreshTokenKey, _RefreshToken);

}

export function getTokenTime() {
  return sessionStorage.getItem("tokenTime");
}

export function setTokenTime(_tokenTime) {
  return sessionStorage.setItem("tokenTime", _tokenTime);
}

export function getExpires() {
  return sessionStorage.getItem("tokenExpires");
}

export function setExpires(_tokenExpires) {
  return sessionStorage.setItem("tokenExpires", _tokenExpires);
}
