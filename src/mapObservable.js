/* @flow */

class MapObserver<V, E, R> {
    _observer: SubscriptionObserver<R, E>
    _mapFn: (val: V) => R

    constructor(
        observer: SubscriptionObserver<R, E>,
        mapFn: (val: V) => R
    ) {
        this._observer = observer
        this._mapFn = mapFn
    }

    next(val: V): void {
        if (this._observer.closed) {
            return
        }
        let v: R
        try {
            v = this._mapFn(val)
        } catch (e) {
            this.error(e)
            return
        }
        this._observer.next(v)
    }

    error(err: E): void {
        this._observer.error(err)
    }

    complete(v: mixed): void {
        this._observer.complete(v)
    }
}

/**
 * Map observable value
 *
 * @example
 * ```js
 * // @flow
 * mapObservable(new Observable((observer: SubscriptionObserver) => {
 *     observer.next(1)
 * }), (val: number) => val * 2)
 *
 * // outputs: 2
 * ```
 */
export default function mapObservable<V, R, E>(
    observable: Observable<V, E>,
    mapFn: (val: V) => R
): Observable<R, E> {
    return new Observable((observer: SubscriptionObserver<R, E>) =>
        observable.subscribe(new MapObserver(observer, mapFn))
    )
}
