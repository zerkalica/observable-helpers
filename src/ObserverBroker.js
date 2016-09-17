/* @flow */

function noop() {}

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
export default class ObserverBroker<V> {
    _observers: Array<SubscriptionObserver<V, Error>>;
    observable: Observable<V, Error>;

    constructor(unsubscribe?: () => void = noop) {
        const self = this
        this._observers = []
        function subscription(observer: SubscriptionObserver<V, Error>) {
            self._observers.push(observer)

            function filterFn(target: SubscriptionObserver<V, Error>): boolean {
                return target !== observer
            }

            return function _unsubscribe() {
                self._observers = self._observers.filter(filterFn)
                if (self._observers.length === 0) {
                    unsubscribe()
                }
            }
        }
        this.observable = new Observable(subscription)
    }

    next(value: V): void {
        const observers = this._observers
        try {
            for (let i = 0, l = observers.length; i < l; i++) {
                observers[i].next(value)
            }
        } catch (e) {
            this.error(e)
        }
    }

    error(err: Error): void {
        const observers = this._observers
        for (let i = 0, l = observers.length; i < l; i++) {
            observers[i].error(err)
        }
    }

    complete(): void {
        const observers = this._observers
        for (let i = 0, l = observers.length; i < l; i++) {
            observers[i].complete()
        }
    }
}
