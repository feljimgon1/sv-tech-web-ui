import { createSelector } from "@reduxjs/toolkit";
import { DOMAIN } from "./constants";

const getUserState = (state) => state[DOMAIN] || {};

// Token treatment 

export const getToken = createSelector(
  getUserState,
  (user) => {
    const token = user?.token
    const cookies = document.cookie.split(';')
    const cookieName = ` ${DOMAIN}=`
    const cookiePrefix = `${DOMAIN}=`
    const cookieSuffix = ';'

    const cookie = cookies.find(cookie => cookie.trim().startsWith(cookiePrefix) && cookie.trim().endsWith(cookieSuffix))

    if (cookie) {
      const cookieValue = decodeURIComponent(cookie.trim().replace(cookieName, '').replace(cookieSuffix, ''))
      return token === cookieValue
    }

    return false
  }
);

export const getIsUserLoggedIn = createSelector(
  getToken,
  (token) => token !== null
);

// User treatment

export const getUser = createSelector(
  getUserState,
  (user) => user.user
);

export const getIsUserVerified = createSelector(
  getUser,
  (user) => user?.user?.active || user?.active
);
