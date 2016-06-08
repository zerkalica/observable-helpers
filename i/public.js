/* @flow */

export interface Resolution {
    width: number;
    height: number;
}

export interface Attacheable {
    addEventListener?: ?(eventName: string, handler: Function) => void;
    removeEventListener?: ?(eventName: string, handler: Function) => void;
    attachEvent?: ?(eventName: string, handler: Function) => void;
    detachEvent?: ?(eventName: string, handler: Function) => void;
}
