/* @flow */

import Observable from 'zen-observable'

class DelayedObserver<V, E> {
    _src: Observer<V, E>;
    _delay: number;

    _value: V;
    _completeValue: ?V;
    _error: E;

    _valueHandle: ?number;
    _errorHandle: ?number;
    _completeHandle: ?number;

    constructor(src: Observer<V, E>, delay: number) {
        this._src = src
        this._delay = delay
    }

    _next: () => void = () => {
        this._src.next(this._value)
        this._valueHandle = null
    };

    next(v: V): void {
        this._value = v
        if (!this._valueHandle) {
            this._valueHandle = setTimeout(this._next, this._delay)
        }
    }

    _complete: () => void = () => {
        this._src.complete((this._completeValue: any))
        this._completeHandle = null
    };

    complete(v?: V): void {
        this._completeValue = v
        if (!this._completeHandle) {
            this._completeHandle = setTimeout(this._complete, this._delay)
        }
    }

    _err: () => void = () => {
        this._src.error(this._error)
        this._errorHandle = null
    };

    error(err: E): void {
        this._error = err
        if (!this._errorHandle) {
            this._errorHandle = setTimeout(this._err, this._delay)
        }
    }
}

export default function throttle<V, E>(src: Observable<V, E>, delay: number): Observable<V, E> {
    function subscribe(observer: SubscriptionObserver<V, E>): () => void {
        const subscription = src.subscribe(new DelayedObserver(observer, delay));
        return function unsubscribe(): void {
            subscription.unsubscribe()
        }
    }
    return new Observable(subscribe)
}
