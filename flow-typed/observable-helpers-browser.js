/* @flow */

import type {Resolution, Attacheable} from 'observable-helpers/i/public'

declare module 'observable-helpers/browser' {
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
}
