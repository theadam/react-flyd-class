import React from 'react';
import { isStream, on } from 'flyd';
import { pickProps } from './utils';

export default function createReactiveClass(tag) {
  class ReactiveClass extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = `FlydReactiveElement-${tag}`;
      this.state = pickProps(props, (key, value) => !isStream(value));
      this.state.mount = true;
    }

    componentWillMount() {
      this.subscribe(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.subscribe(nextProps);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    addPropListener(name, prop$) {
      return on((value) => {
        // don't re-render if value is the same.
        if (value === this.state[name]) {
          return;
        }

        const prop = {};
        prop[name] = value;
        this.setState(prop);
      }, prop$);
    }

    subscribe(props) {
      if (this.subscriptions) {
        this.unsubscribe();
      }

      this.subscriptions = [];

      Object.keys(props).forEach(key => {
        const value = props[key];
        if (isStream(value)) {
          const subscription = this.addPropListener(key, value);
          this.subscriptions.push(subscription);
        }
      });
    }

    unsubscribe() {
      this.subscriptions.forEach(subscription => subscription.end());
      this.subscriptions = null;
    }

    render() {
      if (!this.state.mount) {
        return null;
      }

      const finalProps = pickProps(this.state, (key) => key !== 'mount');
      if (tag) {
        return React.createElement(tag, finalProps);
      } else {
        const {children, ...props} = finalProps
        return React.cloneElement(children, props)
      }
    }
  }

  return ReactiveClass;
}
