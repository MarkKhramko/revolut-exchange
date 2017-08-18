export const PROTOCOL = "http";
export let DOMAIN;

if (process.env.NODE_ENV == "production") {
  DOMAIN = PROTOCOL + "://185.188.182.136";
} else {
  DOMAIN = PROTOCOL + "://localhost:8888";
}

export const API_URL = DOMAIN + "/api";
export const LOGIN_URL = API_URL + '/auth/login';

export const DIPLOMA_THUMBNAILS_URL = API_URL + '/get_diploma_thumbnails';
export const DIPLOMA_GENERATOR_URL = API_URL + '/generate_diploma';