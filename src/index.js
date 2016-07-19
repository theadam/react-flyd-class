import createReactiveClass from './createReactiveClass';

export function reactive(reactClass) {
  return createReactiveClass(reactClass);
}

