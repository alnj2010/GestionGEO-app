const KEY_STORAGE = {
  USER: 'user',
  TEACHER_ID: 'teacher-id',
  STUDENT_ID: 'student-id',
  GEO_TOKEN: 'geo-token',
  USER_ROL: 'user-rol',
  USER_ID: 'user-id',
  TOKEN_EXPIRES: 'token-expires',
  INIT_TIME_LOGIN: 'init-time-login',
  IS_MAIN_USER: 'is-main-user',
  HIDE_WELCOME_MODAL: 'hide-welcome-modal',
};

export function setSessionUser(value) {
  sessionStorage.setItem(KEY_STORAGE.USER, JSON.stringify(value));
}

export function getSessionUser() {
  return JSON.parse(sessionStorage.getItem(KEY_STORAGE.USER));
}

export function setSessionTeacherId(value) {
  sessionStorage.setItem(KEY_STORAGE.TEACHER_ID, value);
}

export function getSessionTeacherId() {
  return sessionStorage.getItem(KEY_STORAGE.TEACHER_ID);
}

export function setSessionStudentId(value) {
  sessionStorage.setItem(KEY_STORAGE.STUDENT_ID, value);
}

export function getSessionStudentId() {
  return sessionStorage.getItem(KEY_STORAGE.STUDENT_ID);
}

export function setSessionGeoToken(value) {
  sessionStorage.setItem(KEY_STORAGE.GEO_TOKEN, value);
}

export function getSessionGeoToken() {
  return sessionStorage.getItem(KEY_STORAGE.GEO_TOKEN);
}

export function removeSessionGeoToken() {
  sessionStorage.removeItem(KEY_STORAGE.GEO_TOKEN);
  sessionStorage.removeItem(KEY_STORAGE.USER_ROL);
  sessionStorage.removeItem(KEY_STORAGE.USER_ID);
  sessionStorage.removeItem(KEY_STORAGE.STUDENT_ID);
  sessionStorage.removeItem(KEY_STORAGE.TEACHER_ID);
  sessionStorage.removeItem(KEY_STORAGE.IS_MAIN_USER);
  sessionStorage.removeItem(KEY_STORAGE.USER);
  sessionStorage.removeItem(KEY_STORAGE.INIT_TIME_LOGIN);
  sessionStorage.removeItem(KEY_STORAGE.TOKEN_EXPIRES);
}

export function setTokenExpires(value) {
  sessionStorage.setItem(KEY_STORAGE.TOKEN_EXPIRES, value);
}

export function getTokenExpires() {
  return sessionStorage.getItem(KEY_STORAGE.TOKEN_EXPIRES);
}

export function setInitTimeLogin(value) {
  sessionStorage.setItem(KEY_STORAGE.INIT_TIME_LOGIN, value);
}

export function getInitTimeLogin() {
  return sessionStorage.getItem(KEY_STORAGE.INIT_TIME_LOGIN);
}

export function setSessionUserRol(value) {
  sessionStorage.setItem(KEY_STORAGE.USER_ROL, value);
}

export function getSessionUserRol() {
  return sessionStorage.getItem(KEY_STORAGE.USER_ROL);
}

export function setSessionUserId(value) {
  sessionStorage.setItem(KEY_STORAGE.USER_ID, value);
}

export function getSessionUserId() {
  return sessionStorage.getItem(KEY_STORAGE.USER_ID);
}

export function setSessionIsMainUser(value) {
  sessionStorage.setItem(KEY_STORAGE.IS_MAIN_USER, value);
}

export function getSessionIsMainUser() {
  return sessionStorage.getItem(KEY_STORAGE.IS_MAIN_USER);
}

export function setHideWelcomeModal() {
  localStorage.setItem(KEY_STORAGE.HIDE_WELCOME_MODAL, true);
}

export function getHideWelcomeModal() {
  return JSON.parse(localStorage.getItem(KEY_STORAGE.HIDE_WELCOME_MODAL));
}
