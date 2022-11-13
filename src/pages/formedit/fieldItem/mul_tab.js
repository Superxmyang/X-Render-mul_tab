import React, { Component } from 'react'
import { Switch } from 'antd';



const mul_tab =()=> {
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
      };
    return (
        <>
            <div>多标签打开</div>
            <Switch onChange={onChange} />
        </>
    )
  
}

export  default  mul_tab