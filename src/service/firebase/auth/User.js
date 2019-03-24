const data = Symbol('data');

export default class User {
  constructor(value) {
    this.valid = !!value;
    this[data] = value || {};
  }

  getName () {
    return this[data].displayName || '';
  }

  getEmail () {
    return this[data].email || '';
  }

  getImage () {
    return this[data].photoURL || '';
  }
}
