import React, { Component } from 'react'
import { Switch } from 'antd';
import { observer,inject} from 'mobx-react'
import { toJS} from 'mobx'

const mul_tab =observer(({ FormStore }) => {
    const onChange = (checked) => {
        console.log('formEditSchema',toJS(FormStore.formEditSchema))
        let schema=toJS(FormStore.formEditSchema)
        if (schema.properties.Tabs){
            delete schema.properties.Tabs
        }else{
            schema.properties.Tabs={
                title:'多标签',
                type:'string'
            }
        }
        FormStore.setValue('formEditSchema', schema)
        console.log(`switch to ${checked}`);
      };
    return (
        <>
            <div>多标签打开</div>
            <Switch onChange={onChange} />
        </>
    )
  
})

export  default  inject((store) => ({ FormStore: store.FormStore }))(mul_tab);