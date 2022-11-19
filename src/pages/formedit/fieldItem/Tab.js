import React, { Component } from 'react'
import {Tabs} from 'antd'


const Tab = ()=> {
    const onChange=(e)=>{
        console.log(e)
    }
    return (
        <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: `Tab 1`,
            key: '1'
          },
          {
            label: `Tab 2`,
            key: '2'
          },
          {
            label: `Tab 3`,
            key: '3'
          },
        ]}
      />
    )
  
}
export default Tab