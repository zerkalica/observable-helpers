// @flow

import {TimeoutError} from 'observable-helpers/exceptions'

/**
 * Auto-cancel promise after timeout
 *
 * @example
 * ```js
 * // @flow
 * timeoutPromise(new Promise((resolve) => {
 *     setTimeout(resolve, 10000)
 * }), 100)
 *     .catch((err) => console.log(err.message))
 *
 * // throws TimeoutError after 100 ms
 * ```
 */
export default function timeoutPromise<D>(promise: Promise<D>, timeout: number): Promise<D> {
    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            const err = new TimeoutError()
            setTimeout(() => reject(err), timeout)
        })
    ])
}
