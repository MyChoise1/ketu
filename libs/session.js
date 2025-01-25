export const defaultSession = null;

export const sessionOptions = {
  password: "XAigt5c7A4jhHbNG2oPk",
  cookieName: "user_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
