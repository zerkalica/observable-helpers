/* @flow */

import observableFromEvent from 'observable-helpers/browser/observableFromEvent'
import throttle from 'observable-helpers//throttle'
import Resolution from 'observable-helpers/Resolution'
import mapObservable from 'observable-helpers/mapObservable'

export default function createBrowserResolution(
    target: {
        innerWidth: number,
        innerHeight: number
    },
    delay: number = 300
): Resolution {
    const observable: Observable<Resolution, Error> =
        mapObservable(
            throttle(observableFromEvent(target, 'resize'), delay),
            () => new Resolution(target.innerWidth, target.innerHeight)
        )

    return new Resolution(
        target.innerWidth,
        target.innerHeight,
        observable
    )
}
