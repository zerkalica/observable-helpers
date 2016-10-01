// @flow

export default function pollingPromise<V>(
    load: () => Promise<V>,
    timeoutFn: () => number,
    isComplete: ?(value: V) => boolean
): Observable<V, Error> {
    function pollingPromiseSubscriber(observer: SubscriptionObserver<V, Error>): () => void {
        let handle: ?number = null
        function doLoad() {
            clearTimeout(handle)

            load()
                .then((value: V) => {
                    observer.next(value)
                    if (isComplete && isComplete(value)) {
                        observer.complete()
                    } else {
                        const timeout: number = timeoutFn()
                        if (timeout) {
                            handle = setTimeout(doLoad, timeout)
                        }
                    }
                })
                .catch((error: Error) => observer.error(error))
        }

        doLoad()

        return () => {
            clearTimeout(handle)
        }
    }

    return new Observable(pollingPromiseSubscriber)
}

export function createTimeoutFn(from: number): () => number {
    let step: number = 0
    return function timeoutFn(): number {
        step = step + 1 // eslint-disable-line
        return from + (step * 500)
    }
}
