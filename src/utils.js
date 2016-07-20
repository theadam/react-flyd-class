import { isStream, combine } from 'flyd';

export function hasStream(array) {
  for (let i = 0; i < array.length; i++) {
    if (isStream(array[i])) return true;
  }
  return false;
}

function evaluateStreams(array) {
  return array.map(child => {
    if (!isStream(child)) return child;
    return child();
  });
}

export function arrayStream(array) {
  const streams = array.filter(isStream);
  return combine(() => evaluateStreams(array), streams);
}
