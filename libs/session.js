export const defaultSession = null;

export const sessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD,
  cookieName: "user_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
