export const prod = process.env.NODE_ENV === "production"
export const API_URL = prod ? process.env.API_URL : process.env.LOCAL_API_URL

export const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/;