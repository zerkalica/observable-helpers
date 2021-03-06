/* @flow */


/**
 * Resolution class with width and height
 */
export default class Resolution {
    width: number;
    height: number;

    // [id: $SymbolObservable]: () => Observable<Resolution, Error>;

    constructor(
        width: number,
        height: number,
        observable?: Observable<Resolution, Error>
    ) {
        this.width = width
        this.height = height
        ;(this: Object)[Symbol.observable] = () => observable
    }
}
