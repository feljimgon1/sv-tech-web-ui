import { DOMAIN } from "./constants";

export const getNotification = (state) => state[DOMAIN] || {};
