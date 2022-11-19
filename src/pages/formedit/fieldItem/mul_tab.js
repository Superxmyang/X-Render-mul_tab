import React, { Component } from 'react'
import { Switch, Input } from 'antd';
import { observer, inject } from 'mobx-react'
import { DeleteOutlined } from "@ant-design/icons";
import { toJS } from 'mobx'

const mul_tab = observer(({ FormStore }) => {
    let checked = toJS(FormStore.schema.properties).hasOwnProperty('Tabs')
    let subFormName = FormStore.subFormName
    const onChange = (checked) => {
        console.log('formEditSchema', toJS(FormStore.schema))
        let schema = toJS(FormStore.schema)
        if (schema.properties.hasOwnProperty('Tabs')) {
            delete schema.properties.Tabs
        } else {
            schema.properties.Tabs = {
                type: 'string',
                widget: 'Tab'
            }
        }
        FormStore.setValue('formEditSchema', schema)
        FormStore.setValue('schema', schema)
        console.log(`switch to ${checked}`, schema);
    };
    const titleChange = (value, index) => {
        let iList = [...subFormName]
        console.log(iList)
        FormStore.setValue('subFormName', iList);
    }
    return (
        <>
            <div>多标签打开</div>
            <Switch onChange={onChange} />
            <div className='block'>
                {checked && (
                    subFormName.map((item, index) => {
                        return (
                            <div className="one_tag" key={index}>
                                <Input defaultValue={item.key} className="one_title" onChange={(e) => titleChange(e.target.value, index)} />
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

        </>
    )

})

export default inject((store) => ({ FormStore: store.FormStore }))(mul_tab);