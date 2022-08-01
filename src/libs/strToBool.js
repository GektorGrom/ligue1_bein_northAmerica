function strToBool(str) {
  if (typeof str === 'boolean') {
    return str;
  }
  return str === "true"
}

export default strToBool;
