/* @flow */

export interface Attachable {
    addEventListener?: ?(eventName: string, handler: Function) => void;
    removeEventListener?: ?(eventName: string, handler: Function) => void;
    attachEvent?: ?(eventName: string, handler: Function) => void;
    detachEvent?: ?(eventName: string, handler: Function) => void;
}

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
 *
 */
export default function observableFromEvent<V, E>(
    target: Attachable,
    eventName: string
): Observable<V, E> {
    function observableFromEventSubscriber(observer: SubscriptionObserver<V, E>): () => void {
        function handler(data: V): void {
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
