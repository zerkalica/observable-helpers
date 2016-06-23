/* @flow */

export default function isObservable(val: mixed): boolean {
    if (!val || typeof val !== 'object') {
        return false
    }

    return !!(val: Object)[Symbol.observable]
}
