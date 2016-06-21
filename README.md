# observable-helpers

Helpers on top of [es-observable](https://github.com/zenparsing/es-observable)

Need observable polyfill from [core-js](https://github.com/zloirock/core-js) or [zen-observable](https://github.com/zenparsing/zen-observable)

Features:

Generic: map, throttle, timeoutPromise, ObserverBroker

Browser: create observable from DOMElement event, observable resolution object from window


## Generic

```js
// @flow
import {
    ObservableBroker,
    promiseToObservable
} from 'observable-helpers'
// ...
```

```js
// @flow
/**
 * One observer controls many observables
 *
 * @example
 * ```js
 *  // @flow
 *  const broker = new ObservableBroker(() => {
 *      console.log('all listeners unsubscribed')
 *  })
 *  const unsub1 = broker.observable.subscribe({
 *      next(val: string): void {
 *          console.log(1, val)
 *      }
 *   )

 *  const unsub2 = broker.observable.subscribe({
 *      next(val: string): void {
 *          console.log(2, val)
 *      }
 *  })

 *  broker.next('val')
 *  // 1 val
 *  // 2 val

 *  unsub1()
 *  unsub2()
 *  // all listeners unsubscribed
 *  ```
 */
declare class ObserverBroker<V> {
    constructor(unsubscribe?: () => void): ObserverBroker<V>;
    observable: Observable<V, Error>;
    next(value: V): void;
    error(err: Error): void;
    complete(): void;
}

/**
 * Convert promise to observable
 *
 * @param Promise promise input promise
 * @param [boolean] thenIsNext - on then(data) generate next(data), complete(), on false - generate complete(data)
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
declare function promiseToObservable<V, E>(
    promise: Promise<V>,
    thenIsNext?: boolean
): Observable<V, E>;

/**
 * Throttle observable events
 *
 * @example
 * ```js
 * // @flow
 * throttle(new Observable((observer: SubscriptionObserver) => {
 *     observer.next('1')
 *     observer.next('2')
 * }), 100)
 *
 * // outputs: 2
 * ```
 */
declare function throttle<V, E>(src: Observable<V, E>, delay: number): Observable<V, E>;

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
declare function mapObservable<V, R, E>(observable: Observable<V, E>, mapFn: (val: V) => R): Observable<R, E>;

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
declare function timeoutPromise<D>(promise: Promise<D>, timeout: number): Promise<D>;

/**
 * Resolution class with width and height
 */
declare class Resolution {
    width: number;
    height: number;
    constructor(width: number, height: number): void;
}
```

## Browser

```js
// @flow
import {
    observableFromEvent,
    createBrowserResolution
} from 'observable-helpers/browser'
// ...
```

```js
// @flow
/**
 * Create observable from browser window event
 *
 * @example
 * ```js
 * // @flow
 * observableFromEvent(window, 'resize')
 * .subscribe({
 *     next(e: Event) => {
 *         console.log(window.width, window.height)
 *     }
 * })
 * ```
 */
declare function observableFromEvent<V, E>(
    target: Attacheable,
    eventName: string
): Observable<V, E>;

/**
 * Create observable resolution from window
 *
 * @example
 * ```js
 * // @flow
 *
 * // scan resolution each 100 ms
 * createBrowserResolution(window, 100)
 * 	.subscribe({
 * 	    next(r: Resolution) {
 * 	        console.log(r)
 * 	    }
 * 	})
 *
 *  // Outputs on resolution change: Resolution width: 1024, height: 768
 * ```
 */
declare function createBrowserResolution(
    target: {
        innerWidth: number,
        innerHeight: number
    },
    delay?: number
): Resolution & $ObservableObject;
```
