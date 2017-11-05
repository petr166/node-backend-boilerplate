// log errors
const err = (head, title, body) => {
  const toLog = `![${head.toUpperCase()}] ${title}: ${body || ''}`;
  console.error(toLog); // eslint-disable-line
};

  // log status
const log = (head, title) => {
  const toLog = `[${head.toUpperCase()}] ${title}`;
  console.log(toLog); // eslint-disable-line
};

module.exports = { err, log };
