import { useState } from "react";
import * as React from 'react';

  
  
 
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
interface TableProps{
    columns:ColumnMeta[];
    nodes:never[];
    intialValues:never[];
    setIntialValues:any;
}


export default function DynamicColumnsDemo({columns,nodes,setOpenModal,setItem}:TableProps) {
  
   
    const onClickEdit=(data:any)=> {
        setOpenModal(true)
        setItem(data)
    }
   

    return (
       
<>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {columns.map((item,index)=>(
                      <th key={`tableHead-${index}`} scope="col" className="px-6 py-3">
                      {item.header}
                  </th>
                ))}
            </tr>
        </thead>
        <tbody>
          {nodes.map((item,index)=>(
            <tr key={`tableBody-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {columns.map((field,index2)=>(
                // we did not use div because it can not be child of tr
              <React.Fragment key={`td-${index2}`}>
                            {typeof(item[field.field]) == "boolean"&&field.option1!=="button"&&<td className="px-6 py-4">
              {item[field.field]?field.selectKindMessage[0].option:field.selectKindMessage[1].option}
          </td>}
          {typeof(item[field.field]) !== "boolean"&&field.option1!=="button"&&<td className="px-6 py-4">
              {item[field.field]}
          </td>}
          {(field.option1=="button")&&<td className="px-6 py-4 text-right">
                    <button className="font-medium text-blue-600 dark:text-blue-500 bg-transparent" onClick={() => onClickEdit(item)}>Edit</button>
                </td>}
              </React.Fragment>

          
            ))}
        </tr>
          ))}
        </tbody>
    </table>
</div>
      
</>


    );
}
