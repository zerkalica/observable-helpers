/* @flow */

class MapObserver<V, E, R> {
    _observer: SubscriptionObserver<R, E>;
    _mapFn: (val: V) => R;

    constructor(
        observer: SubscriptionObserver<R, E>,
        mapFn: (val: V) => R
    ) {
        this._observer = observer
        this._mapFn = mapFn
    }

    next(val: V): void {
        this._observer.next(this._mapFn(val))
    }

    error(err: E): void {
        this._observer.error(err)
    }

    complete(v: mixed): void {
        this._observer.complete(v)
    }
}

export default function mapObservable<V, R, E>(
    observable: Observable<V, E>,
    mapFn: (val: V) => R
): Observable<R, E> {
    return new Observable((observer: SubscriptionObserver<R, E>) =>
        observable.subscribe(new MapObserver(observer, mapFn))
    )
}
