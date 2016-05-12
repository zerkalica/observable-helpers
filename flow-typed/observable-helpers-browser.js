/* @flow */

interface Resolution {
    width: number;
    height: number;
}

declare module 'observable-helpers/browser' {
    declare function observableFromEvent<V, E>(
        target: Object,
        eventName: string
    ): Observable<V, E>;

    declare function createBrowserResolution(target: Object, delay?: number): {
        observable: Observable<Resolution, Error>;
        value: Resolution;
    };
}

declare module 'observable-helpers/Resolution' {
    declare class Resolution {
        width: number;
        height: number;
        constructor(width: number, height: number): void;
    }
}
