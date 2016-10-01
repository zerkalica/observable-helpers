/* @flow */
/* eslint-disable import/prefer-default-export */

import Err from 'es6-error'

export class TimeoutError extends Err {
    kind: 'timeout';

    constructor(message: string = 'Timeout error') {
        super(message)
        this.kind = 'timeout'
    }
}
