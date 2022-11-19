import React, { Component , useEffect, useRef, useState} from 'react'
import {Tabs} from 'antd'
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';

const Tab = observer(({FormStore})=> {
  const ref=useRef()
  
  const [subFormName,setSubFormName]=useState(toJS(FormStore.subFormName))
  useEffect(() => {
    setSubFormName(FormStore.subFormName)
  }, [FormStore.subFormName])
  const onChange=(e)=>{
    console.log(e)
    const lastChoose=toJS(FormStore).lastChoose
    FormStore.changeFormEditSchema(e,lastChoose)
    FormStore.setValue('lastChoose',e)
  }
  return (
      <Tabs
      defaultActiveKey={FormStore.lastChoose}
      onChange={onChange}
      items={subFormName}
      ref={ref}
      tabBarGutter={'10px'}
      type='card'
    />
  )

})
export default inject((store) => ({ FormStore: store.FormStore }))(Tab);