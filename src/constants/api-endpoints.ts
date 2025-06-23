// src/constants/api-endpoints.ts

// Centralizar todas as rotas da API aqui
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/registration/',
    PASSWORD_RESET_REQUEST: '/auth/password/reset/',
    PASSWORD_RESET_CONFIRM: (uid: string, token: string) => `/auth/password/reset/confirm/${uid}/${token}/`,
    PASSWORD_CHANGE: '/auth/password/change/',
    USER_PROFILE: '/auth/user/', // GET e PUT
    LOGOUT: '/auth/logout/',
    TOKEN_REFRESH: '/auth/token/refresh/',
    TOKEN_VERIFY: '/auth/token/verify/',
    VERIFY_EMAIL: '/auth/registration/verify-email/',
    RESEND_VERIFY_EMAIL: '/auth/registration/resend-email/',
  },
  USERS: {
    LIST: '/users/',
    DETAIL: (id: number | string) => `/users/${id}/`,
    CREATE: '/users/',
    UPDATE: (id: number) => `/users/${id}/`, // PUT
    PARTIAL_UPDATE: (id: number) => `/users/${id}/`, // PATCH
    DELETE: (id: number) => `/users/${id}/`,
  },
  PLACES: {
    LIST: '/places/',
    DETAIL: (id: number) => `/places/${id}/`,
    CREATE: '/places/',
    UPDATE: (id: number) => `/places/${id}/`,
    PARTIAL_UPDATE: (id: number) => `/places/${id}/`,
    DELETE: (id: number) => `/places/${id}/`,
  },
  STATIONS: {
    LIST: '/stations/',
    DETAIL: (id: number) => `/stations/${id}/`,
    CREATE: '/stations/',
    UPDATE: (id: number) => `/stations/${id}/`,
    PARTIAL_UPDATE: (id: number) => `/stations/${id}/`,
    DELETE: (id: number) => `/stations/${id}/`,
  },
  SENSORS: {
    LIST: '/sensors/',
    DETAIL: (id: number) => `/sensors/${id}/`,
    CREATE: '/sensors/',
    UPDATE: (id: number) => `/sensors/${id}/`,
    PARTIAL_UPDATE: (id: number) => `/sensors/${id}/`,
    DELETE: (id: number) => `/sensors/${id}/`,
  },
  STATION_SENSORS: {
    LIST: '/station_sensors/',
    DETAIL: (id: number) => `/station_sensors/${id}/`,
    CREATE: '/station_sensors/',
    UPDATE: (id: number) => `/station_sensors/${id}/`,
    PARTIAL_UPDATE: (id: number) => `/station_sensors/${id}/`,
    DELETE: (id: number) => `/station_sensors/${id}/`,
  },
  RECORDS: {
    LIST: '/records/',
    DETAIL: (id: number) => `/records/${id}/`,
    CREATE: '/records/',
    UPDATE: (id: number) => `/records/${id}/`,
    PARTIAL_UPDATE: (id: number) => `/records/${id}/`,
    DELETE: (id: number) => `/records/${id}/`,
  },
  EVENTS: {
    LIST: '/events/',
    DETAIL: (id: number) => `/events/${id}/`,
    CREATE: '/events/',
    UPDATE: (id: number) => `/events/${id}/`,
    PARTIAL_UPDATE: (id: number) => `/events/${id}/`,
    DELETE: (id: number) => `/events/${id}/`,
  },
  LOGS: {
    LIST: '/logs/',
    DETAIL: (id: number) => `/logs/${id}/`,
    CREATE: '/logs/',
    UPDATE: (id: number) => `/logs/${id}/`,
    PARTIAL_UPDATE: (id: number) => `/logs/${id}/`,
    DELETE: (id: number) => `/logs/${id}/`,
  },
  // Futuramente, se tiver relatórios agregados:
  // AGGREGATED_METRICS: {
  //   LIST: '/aggregated_metrics/',
  //   GENERATE_DAILY: '/aggregated_metrics/generate-daily/',
  // }
};
