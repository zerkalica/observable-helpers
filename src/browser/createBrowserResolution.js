/* @flow */

import observableFromEvent from 'observable-helpers/browser/observableFromEvent'
import throttle from 'observable-helpers//throttle'
import Resolution from 'observable-helpers/browser/Resolution'

export default function createBrowserResolution(target: Object, delay: number = 300): {
    observable: Observable<Resolution, Error>;
    value: Resolution;
} {
    function getBrowserResolution(): Resolution {
        return new Resolution(target.innerWidth, target.innerHeight)
    }

    const observable: Observable<Resolution, Error> =
        throttle(observableFromEvent(target, 'resize'), delay).map(getBrowserResolution);

    return {
        observable,
        value: getBrowserResolution()
    }
}
