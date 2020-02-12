const compose = (...func) => arg =>
  func.reduceRight((prev, current) => current(prev), arg);

export default compose;
