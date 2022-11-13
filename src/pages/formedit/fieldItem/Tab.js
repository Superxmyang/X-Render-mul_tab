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
            key: '1',
            children: `Content of Tab Pane 1`,
          },
          {
            label: `Tab 2`,
            key: '2',
            children: `Content of Tab Pane 2`,
          },
          {
            label: `Tab 3`,
            key: '3',
            children: `Content of Tab Pane 3`,
          },
        ]}
      />
    )
  
}
export default Tab