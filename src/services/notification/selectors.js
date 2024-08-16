import { DOMAIN } from "./constants";

export const getNotifications = (state) => state[DOMAIN]?.notification || [];
