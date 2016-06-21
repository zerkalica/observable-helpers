/* @flow */

function noop() {}

export default class ObserverBroker<V> {
    _observers: Array<SubscriptionObserver>;
    observable: Observable<V, Error>;

    constructor(unsubscribe?: () => void = noop) {
        const self = this
        this._observers = []
        function subscription(observer: SubscriptionObserver) {
            self._observers.push(observer)

            function filterFn(target: SubscriptionObserver): boolean {
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
