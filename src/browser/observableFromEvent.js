/* @flow */

import type {Attacheable} from 'observable-helpers/i/public'

export default function observableFromEvent<V, E>(
    target: Attacheable,
    eventName: string
): Observable<V, E> {
    function observableFromEventSubscriber(observer: SubscriptionObserver): () => void {
        function handler(data: mixed): void {
            observer.next(data)
        }
        if (typeof target.addEventListener === 'function') {
            target.addEventListener(eventName, handler)
        } else if (typeof target.attachEvent === 'function') {
            target.attachEvent('on' + eventName, handler)
        }

        function observableFromEventUnsubscribe(): void {
            if (typeof target.removeEventListener === 'function') {
                target.removeEventListener(eventName, handler)
            } else if (typeof target.detachEvent === 'function') {
                target.detachEvent('on' + eventName, handler)
            }
        }

        return observableFromEventUnsubscribe
    }

    return new Observable(observableFromEventSubscriber)
}
