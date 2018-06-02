// From https://github.com/prateekbh/redux-storage-engine-indexed-db

import idbKeyVal from '../lib/idb-keyval.js';

const idb = function idb(store) {
    return {
        load() {
            return idbKeyVal.get(store);
        },

        save(states) {
            return idbKeyVal.set(store, states);
        }
    };
};

export default idb;