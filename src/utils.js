export function pickProps(props, validator) {
  const picked = {};

  Object.keys(props).forEach(key => {
    const value = props[key];
    if (validator(key, value)) {
      picked[key] = value;
    }
  });

  return picked;
}
