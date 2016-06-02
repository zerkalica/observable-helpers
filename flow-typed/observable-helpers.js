/* @flow */

declare module 'observable-helpers' {
    declare class ObserverBroker<V> {
        observable: Observable<V, Error>;
        next(value: V): void;
        error(err: Error): void;
        complete(): void;
    }

    declare function promiseToObservable<V, E>(promise: Promise<V>): Observable<V, E>;
    declare function throttle<V, E>(src: Observable<V, E>, delay: number): Observable<V, E>;
    declare function timeoutPromise<D>(promise: Promise<D>, timeout: number): Promise<D>;
}
