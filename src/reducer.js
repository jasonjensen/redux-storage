import { isObject, merge } from 'lodash-es';

import { LOAD } from './constants';

const simpleMerger = (oldState, newState) => {
    const result = { ...oldState };

    for (const key in newState) {
        if (!newState.hasOwnProperty(key)) {
            continue;
        }
        const value = newState[key];

        // Assign if we don't need to merge at all
        if (!result.hasOwnProperty(key)) {
            result[key] = isObject(value) && !Array.isArray(value)
                ? merge({}, value)
                : value;
            continue;
        }

        const oldValue = result[key];

        if (isObject(value) && !Array.isArray(value)) {
            result[key] = merge({}, oldValue, value);
        } else {
            result[key] = value;
        }
    }

    return result;
};

export default (reducer, merger = simpleMerger) => {
    return (state, action) => reducer(
        action.type === LOAD
            ? merger(state, action.payload)
            : state,
        action
    );
};
