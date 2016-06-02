// @flow

import {TimeoutError} from 'observable-helpers/exceptions'

export default function timeoutPromise<D>(promise: Promise<D>, timeout: number): Promise<D> {
    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            const err = new TimeoutError()
            setTimeout(() => reject(err), timeout)
        })
    ])
}
