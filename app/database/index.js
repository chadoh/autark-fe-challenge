import set from 'lodash/set';
import { loadState, saveState } from './localStorage';

const SAVE_SUCCESS = 'DatabaseSaveSuccessEvent';
const SAVE_FAIL = 'DatabaseSaveFailEvent';

let id = 0;

class Database {
  constructor(initialState) {
    this.id = id;
    id += 1;
    this.initialState = initialState;
  }

  fetchData() {
    return loadState(this.id) || this.initialState;
  }

  setData = (path, value) => {
    const data = this.fetchData()
    set(data, path, value)
    try {
      saveState(this.id, data);
      window.dispatchEvent(new CustomEvent(SAVE_SUCCESS));
    } catch (err) {
      window.dispatchEvent(new CustomEvent(SAVE_FAIL));
    }
  }

  addSaveSuccessListener(func) {
    window.addEventListener(SAVE_SUCCESS, func, false);
  }

  removeSaveSuccessListener(func) {
    window.removeEventListener(SAVE_SUCCESS, func, false);
  }
}

import initialState from "./initialState"

export default (init = initialState) => new Database(init);
