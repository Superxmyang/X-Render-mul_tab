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
    @observable subFormName=[{ label: '标签一',key:'1', fields: {} }, { label: '标签二',key:'1', fields: {} }, { label: '标签三',key:'1', fields: {} }]
    @action.bound setValue(key, value) {
        this[key] = value;
    }

}
let FormStore = new Form();
export default FormStore;