/* @flow */
import Observable from 'zen-observable'

export default class ObserverBroker<V> {
    _observers: Array<SubscriptionObserver>;
    observable: Observable<V, Error>;

    constructor() {
        const self = this
        this._observers = []
        function subscription(observer: SubscriptionObserver) {
            self._observers.push(observer)

            function filterFn(target: SubscriptionObserver): boolean {
                return target !== observer
            }

            return function unsubscribe() {
                self._observers = self._observers.filter(filterFn)
            }
        }
        this.observable = new Observable(subscription);
    }

    next(value: V): void {
        const observers = this._observers
        for (let i = 0, l = observers.length; i < l; i++) {
            observers[i].next(value)
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
