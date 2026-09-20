export const devAuth = (req, res, next) => {
  const userId = process.env.DEV_USER_ID;

  if (!userId) {
    return next(new Error('DEV_USER_ID is not set in .env'));
  }

  res.locals.userId = userId;
  next();
};