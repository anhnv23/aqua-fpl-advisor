import {
  getUser,
  handleAuthCallback,
  login,
  logout,
  onAuthChange,
  signup,
} from "@netlify/identity";

let currentUser = null;
const listeners = new Set();

function publish(user) {
  currentUser = user || null;
  for (const listener of listeners) listener(currentUser);
}

async function init() {
  try {
    const callback = await handleAuthCallback();
    publish(callback?.user || await getUser());
  } catch (error) {
    publish(await getUser());
    throw error;
  }
  onAuthChange((_event, user) => publish(user));
  return currentUser;
}

window.aquaAuth = {
  init,
  current: () => currentUser,
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  async login(email, password) {
    const user = await login(email, password);
    publish(user);
    return user;
  },
  async signup(email, password, fullName) {
    const user = await signup(email, password, fullName ? { full_name: fullName } : undefined);
    publish(await getUser());
    return user;
  },
  async logout() {
    await logout();
    publish(null);
  },
};
