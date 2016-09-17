/* @flow */

/**
 * Convert promise to observable
 *
 * @param Promise promise input promise
 * @param [boolean] thenIsNext
 * - on then(data) generate next(data), complete(), on false - generate complete(data)
 *
 * @example
 * ```js
 * // flow
 * promiseToObservable(Promise.resolve('test'))
 *     .subscribe({
 *         complete(val: string): void {
 *             console.log('complete', val)
 *         }
 *     })
 * // outputs: complete test
 *
 * promiseToObservable(Promise.resolve('test'), true)
 *     .subscribe({
 *         next(val: string): void {
 *             console.log('next', val)
 *         },
 *         complete() {
 *             console.log('complete')
 *         }
 *     })
 * // outputs: next test
 * // complete
 * ```
 */
export default function promiseToObservable<V, E>(
    promise: Promise<V>,
    thenIsNext?: boolean = false
): Observable<V, E> {
    if (typeof promise.then !== 'function') {
        throw new TypeError('promise argument is not a Promise')
    }

    function promiseToObservableSubscriber(observer: SubscriptionObserver<V, E>): () => void {
        let isSubscribed: boolean = true

        function promiseToObservableUnsubscribe(): void {
            // todo: memory leak
            isSubscribed = false
            if (typeof promise.cancel === 'function') {
                promise.cancel()
            }
        }
        function success(data: V): void {
            if (isSubscribed) {
                if (thenIsNext) {
                    observer.next(data)
                    observer.complete()
                } else {
                    observer.complete(data)
                }
            }
        }
        function error(e: E): void {
            if (isSubscribed) {
                observer.error(e)
            }
        }
        promise.then(success).catch(error)

        return promiseToObservableUnsubscribe
    }

    return new Observable(promiseToObservableSubscriber)
}
