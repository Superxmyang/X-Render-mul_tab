import { observable, action, makeObservable, toJS } from 'mobx';


class Form{
    constructor() {
        makeObservable(this)
    }

    @observable schema={
        "type": "object",
        "properties": {},
        "labelWidth": 120,
        "displayType": "row"
    }

    @observable formEditSchema={}


}
let FormStore = new Form();
export default FormStore;