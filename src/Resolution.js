/* @flow */

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
        if (observable) {
            (this: Object)[Symbol.observable] = () => observable
        }
    }
}
