/* @flow */

import observableFromEvent from 'observable-helpers/browser/observableFromEvent'
import throttle from 'observable-helpers//throttle'
import Resolution from 'observable-helpers/Resolution'

export default function createBrowserResolution(
    target: {
        innerWidth: number,
        innerHeight: number
    },
    delay: number = 300
): Resolution {
    const observable: Observable<Resolution, Error> =
        throttle(observableFromEvent(target, 'resize'), delay)
            .map(() => new Resolution(target.innerWidth, target.innerHeight))

    return new Resolution(
        target.innerWidth,
        target.innerHeight,
        observable
    )
}
