export function getStorageItem(key) {
  return window.localStorage.getItem(key);
}

export function setStorageItem(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function cleanStorage() {
  const localStorage = Object.entries(window.localStorage);

  for (let [key] of localStorage) {
    window.localStorage.removeItem(key);
  }
}
