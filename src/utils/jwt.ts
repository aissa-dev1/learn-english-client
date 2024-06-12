export function setAccessToken(token: string) {
  sessionStorage.setItem("access_token", token);
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem("access_token");
}

export function removeAccessToken() {
  sessionStorage.removeItem("access_token");
}

export function setRefreshToken(token: string) {
  localStorage.setItem("refresh_token", token);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("refresh_token");
}

export function removeRefreshToken() {
  localStorage.removeItem("refresh_token");
}
