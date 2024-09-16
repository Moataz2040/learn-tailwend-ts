import Sidebar from "../../component/Sidebar/Sidebar"
import Table from "../../component/Table/table"
import React, { useState, useEffect } from 'react';
import useNetworkService from '../../component/Network/NetworkServise';
import { Button, Modal, FloatingLabel,Select  } from "flowbite-react";

import {
    useFormik ,
  } from 'formik';
interface ColumnMeta {
    field: string;
    header: string;
    type?:string;
    expander?: boolean;
    selectKind?:string;
    selectKindMessage?:{option:string}[];
    option1?:string;
    edit:boolean
}
export default function AllDistricts() {
    const columns: ColumnMeta[] = [
        { field: 'name', header: 'اسم الادارة',type:'text', expander: true,edit:true },
        { field: 'itCenterCode',type:'text', header: 'كود مركز المعلومات',edit:true },
        { field: 'nameGovernorate',type:'dropdown', header: 'المحافظة',edit:true },
        { field: 'goveronrateDirationName',type:'text', header: 'وجهة المحافظة',edit:false },
        { field: 'comprehensiveHealthInsurance',type:'dropdown',selectKind:'boolean',selectKindMessage:[{'option':'نعم'},{'option':'لا'}], header: 'داخل التأمين الصحي الشامل',edit:true },
        { field: 'isActive',type:'dropdown',selectKind:'boolean',selectKindMessage:[{'option':'نشط'},{'option':'غير نشط'}], header: 'الحالة',edit:true },
        { field: 'type', header: 'اختيارات' ,option1:'button',edit:false},
    ];
    interface MyFormValues {
      name: string;
      itCenterCode: string;
      nameGovernorate: string;
      goveronrateDirationName: string;
      comprehensiveHealthInsurance: string;
      isActive: string;
    }

    const { getData } = useNetworkService();
    const [nodes, setNodes] = useState([]);
    const [intialValues, setIntialValues] = useState({
      name: 'bsdgsdg',
      itCenterCode: '',
      nameGovernorate: '',
      goveronrateDirationName: '',
      comprehensiveHealthInsurance: '',
      isActive: '',
    });
    const [openModal, setOpenModal] = useState(false);
    const [item, setItem] = useState({});
    useEffect(() => {
      getData().then(data=>setNodes(data.districtsOnPage))
      console.log(item);
      
      
    }, [item]);



 function onCloseModal() {
      setOpenModal(false);
    }
 const formik = useFormik({
        initialValues: intialValues,
        onSubmit: values => {
          console.log(values);
          
        },
      });
  return (
    <>
     <div className='container flex'>
     <Sidebar/>
     <Table columns={columns} nodes={nodes} intialValues={intialValues} setOpenModal={setOpenModal} setItem={setItem}/>
     <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
        <h1 className="mb-2">تعديل البيانات</h1>

         <form onSubmit={formik.handleSubmit}>
         {columns.map((input,inputIndex)=>(
            <React.Fragment key={`input-${inputIndex}`}>
                {(input.edit == true)&&(input.type == "text")&&<div className={`${input.field}`}>            
                        <FloatingLabel id={input.field} name={input.field} variant="outlined" defaultValue={item[input.field]} label={input.header} onChange={formik.handleChange} />
                        </div>}                
                {(input.edit == true)&&(input.type == "dropdown")&&<div className={`${input.field} max-w-md`}>
      <Select id="countries" className="mt-2" required onChange={formik.handleChange} defaultValue={item[input.field]}>
        {input.selectKind!=='boolean'&&
        <>
         <option >{item[input.field]}</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
        </>}
        {input.selectKind=='boolean'&&
        <>
         <option>{item[input.field]?input.selectKindMessage[0].option:input.selectKindMessage[1].option}</option>
        {input.selectKindMessage?.map((message,messageIndex)=>(
                <option key={`message-${messageIndex}`}>{message.option}</option>
        ))}
        </>}
      </Select>
    </div>}                
            </React.Fragment>
         ))}

            <Button className="mt-3" type="submit">تعديل</Button>
         </form>

        </Modal.Body>
      </Modal>
      </div>
    </>
  )
}
