// eslint-disable-next-line no-console
const loggerFunction = process.env.NODE_V === 'development' ? console.log : () => {};

const log = (...args) => {
  const mappedArguments = args.map(arg => JSON.stringify(arg, null, 2));
  loggerFunction.apply(console, mappedArguments);
};

export default log;
