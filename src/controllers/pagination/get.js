module.exports = async (_req, res, next) => {
  try {
    res.status(200).end();
  } catch (e) {
    next(e);
  }
};
