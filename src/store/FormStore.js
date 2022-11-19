import { observable, action, makeObservable, toJS } from 'mobx';

class Form{
    constructor() {
        makeObservable(this)
    }

    @observable schema={//Provider内部传来的
        "type": "object",
        "properties": {},
        "labelWidth": 120,
        "displayType": "row"
    }

    @observable formEditSchema={}
    @observable subFormName=[{ label: '标签一',key:'1',fields:{} }, { label: '标签二',key:'2',fields:{} }, { label: '标签三',key:'3',fields:{} }]
    @observable lastChoose='1'
    @action.bound setValue(key, value) {
        this[key] = value;
    }
    /**
     * 更改表单结果，第一个参数为转变之后的参数，第二个参数为之前的参数
     * 
     * @param {Number } TabIndex 当前要切换的表单的key值
     * @param {Number | undefined} lastChoose 上一个表单的key值
     * @param {Boolean} isDelete 是否需要删除
     */
    @action.bound changeFormEditSchema(TabIndex,lastChoose,isDelete=false){
        let isTab=false
        let items={}
        let formEdit= Object.assign({},toJS(this.schema))
        let formEditSchema=formEdit.properties
        console.log('schema',formEdit)
        for (let key in formEditSchema) {
            console.log(key)
            if(isTab){
                items[key]=Object.assign({},formEditSchema[key])
                delete formEditSchema[key]
            }
            if(key==='Tabs') isTab=true
        }
        let subFormName=toJS(this.subFormName)
        console.log('changeFormEdit',subFormName)
        let subFormItem=subFormName.find((item)=> item.key===TabIndex)
        let lastsubFormItem=subFormName.find((item)=> item.key===lastChoose)
        if(isDelete){
            subFormName.splice(subFormName.findIndex((item)=> item.key===lastChoose),1)
        }else{
            lastsubFormItem.fields=items
        }
        console.log('items',items)
        console.log(lastsubFormItem,'lastsubFormItem')
        console.log(subFormItem,'subFormItem')
        formEdit.properties={...formEditSchema,...subFormItem.fields}
        console.log('subFormName',subFormName);
        
        console.log('changeFormformEditSchema',formEdit)
        this.setValue('subFormName',subFormName)
        this.setValue('formEditSchema',formEdit)
        this.setValue('schema',formEdit)
    }

    @action.bound deleteTab(){
        this.setValue('subFormName',[{ label: '标签一',key:'1',fields:{} }, { label: '标签二',key:'2',fields:{} }, { label: '标签三',key:'3',fields:{} }])
        let formEdit= Object.assign({},toJS(this.schema))
        let formEditSchema=formEdit.properties
        let isTab=false
        for (let key in formEditSchema) {
            console.log(key)
            if(isTab){
                delete formEditSchema[key]
            }
            if(key==='Tabs') isTab=true
        }
        delete formEditSchema.Tabs
        this.setValue('formEditSchema',formEdit)
        this.setValue('schema',formEdit)
    }

}
let FormStore = new Form();
export default FormStore;