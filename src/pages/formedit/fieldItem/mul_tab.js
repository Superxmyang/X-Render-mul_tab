import React, { Component, useState } from 'react'
import { Switch, Input } from 'antd';
import { observer, inject } from 'mobx-react'
import { DeleteOutlined } from "@ant-design/icons";
import { toJS } from 'mobx'
import './index.css'
const mul_tab = observer(({ FormStore }) => {
    let checked = toJS(FormStore.schema.properties).hasOwnProperty('Tabs')
    let subFormName = FormStore.subFormName
    const [keyid,setKeyId]=useState(3)
    const onChange = (checked) => {
        console.log('formEditSchema', toJS(FormStore.schema))
        let schema = toJS(FormStore.schema)
        if (schema.properties.hasOwnProperty('Tabs')) {
            FormStore.deleteTab()
        } else {
            schema.properties.Tabs = {
                type: 'string',
                widget: 'Tab'
            }
            FormStore.setValue('formEditSchema', schema)
            FormStore.setValue('schema', schema)
        }
        console.log(`switch to ${checked}`, schema);
    };
    const handleDel=(index)=>{
        let formEditSchema=FormStore.formEditSchema
        let iList=[...subFormName]
        let lastChoose=FormStore.lastChoose 
        if(iList[index].key==lastChoose){
            let newChoose=iList[index===iList.length-1?index-1:index+1].key
            console.log('newChoose',newChoose)
            console.log('beforeChoose',iList[index].key);
            FormStore.changeFormEditSchema(newChoose,iList[index].key,true)
            FormStore.setValue('lastChoose',newChoose)
        }else{
            iList.splice(index,1)
            FormStore.setValue('subFormName', iList);
            FormStore.setValue('formEditSchema',formEditSchema)
        }
        
    }
    const titleChange = (value, index) => {
        let iList = [...subFormName]
        iList[index].label=value
        FormStore.setValue('subFormName', iList);
    }
    const handleAdd=()=>{
        let iList = [...subFormName]
        console.log('handleAdd')
        iList.push({label:'标签',key:(keyid+1).toString()})
        setKeyId(keyid+1)
        FormStore.setValue('subFormName', iList);
    }
    return (
        <div>
            <div>多标签打开</div>
            <Switch onChange={onChange} />
            <div className='all_tags'>
                {checked && (
                    subFormName.map((item, index) => {
                        item=toJS(item)
                        return (
                            <div className="one_tag" key={item.key}>
                                <Input defaultValue={item.label} className="one_title" onBlur={(e) => titleChange(e.target.value, index)} />
                                {
                                    subFormName.length > 2 ? (
                                        <DeleteOutlined onClick={() => handleDel(index)} />
                                    ) : (
                                        <DeleteOutlined />
                                    )
                                }
                            </div>
                        )
                    })
                )}
            </div>
            {
                checked && (
                    <div className="add_tag" onClick={handleAdd}>
                        +添加标签页
                    </div>
                )
            }
        </div>
    )

})

export default inject((store) => ({ FormStore: store.FormStore }))(mul_tab);