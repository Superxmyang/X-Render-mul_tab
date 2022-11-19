import Generator from 'fr-generator';
import React, { useEffect, useRef,useState } from 'react';
import { DeleteOutlined } from "@ant-design/icons";
import { defaultGlobalSettings } from './field_config'
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Tab from './fieldItem/Tab'
import mul_tab from './fieldItem/mul_tab'

// import './index.less';


const { Provider, Settings, Canvas, Sidebar } = Generator
const Demo = observer(({ FormStore }) => {
    const ref = useRef();
    console.log('FormStore',FormStore)
    // const { formEditSchema } = FormStore
    const [schema, setSchema] = useState({});
    // useEffect(() => {
    //     FormStore.setValue('formEditSchema',defaultValue)
    // }, []);
    useEffect(()=>{
        ref.current.setValue(FormStore.formEditSchema)
        console.log('refchange',toJS(FormStore.formEditSchema))
    },[FormStore.formEditSchema])
    const defaultValue = {
        type: 'object',
        properties: {
           
        },
    };

    const schemaChange=(schema)=>{
        console.log('schema:change', schema)
        FormStore.setValue('schema', toJS(schema))
        // setSchema(schema)
        // ref.current.setValue(schema)
    }
    const canDelete=()=>{
        
    }
    const deleteField=(event,schema)=>{
        if(schema.widget==='Tab'){return}
        console.log(schema)
        let id=schema.$id.substring(2)
        schema=ref.current.getValue()
        delete schema.properties[id]
        ref.current.setValue(schema)
        FormStore.setValue('schema', toJS(schema))
    }
    return (
        <div className="fr-generator-playground" style={{ height: '800px' }}>
            <Provider
                // schema={FormStore.formEditSchema}
                onChange={data => console.log('data:change', data)}
                onSchemaChange={schemaChange}
                defaultValue={defaultValue}
                globalSettings={defaultGlobalSettings}
                ref={ref}
                canDelete={canDelete}
                hideId={true}
                controlButtons={[false,false,{ text: <DeleteOutlined/>, onClick:deleteField }]}
                widgets={{
                    mul_tag:mul_tab,
                    Tab:Tab
                }}
            >
                <div className="fr-generator-container">
                <Sidebar  />
                    <Canvas />
                    <Settings />
                </div>
            </Provider>
        </div>
    );
})

export default inject((store) => ({ FormStore: store.FormStore }))(Demo);