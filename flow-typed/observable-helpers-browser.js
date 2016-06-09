/* @flow */

import type {Resolution, Attacheable} from 'observable-helpers/i/public'

declare module 'observable-helpers/browser' {
    declare function observableFromEvent<V, E>(
        target: Attacheable,
        eventName: string
    ): Observable<V, E>;

    declare function createBrowserResolution(
        target: {
            innerWidth: number,
            innerHeight: number
        },
        delay?: number
    ): Resolution & $ObservableObject;
}
