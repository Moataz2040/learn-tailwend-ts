import { useState } from "react";
import * as React from "react";
import style from "./Table.module.css";

interface ColumnMeta {
  field: string;
  header: string;
  type?: string;
  expander?: boolean;
  selectKind?: string;
  selectKindMessage?: { option: string }[];
  option1?: string;
  edit: boolean;
}
interface TableProps {
  columns: ColumnMeta[];
  nodes: never[];
  onClickEdit: never;
}

export default function DynamicColumnsDemo({
  columns,
  nodes,
  onClickEdit,
}: TableProps) {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table
          className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}
        >
          <thead
            className={`text-xs text-gray-700 uppercase ${style.tableHead} dark:bg-gray-700 dark:text-gray-400`}
          >
            <tr className={`${style.tableBody} `}>
              {columns.map((item, index) => (
                <th
                  key={`tableHead-${index}`}
                  scope="col"
                  className="px-6 py-3 text-lg font-black"
                >
                  {item.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nodes.map((item, index) => (
              <tr
                key={`tableBody-${index}`}
                className={`${style.tableBody} bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 `}
              >
                {columns.map((field, index2) => (
                  // we did not use div because it can not be child of tr
                  <React.Fragment key={`td-${index2}`}>
                    {typeof item[field.field] == "boolean" &&
                      field.option1 !== "button" && (
                        <td className="px-6 py-4">
                          {item[field.field]
                            ? field.selectKindMessage[0].option
                            : field.selectKindMessage[1].option}
                        </td>
                      )}
                    {typeof item[field.field] !== "boolean" &&
                      field.option1 !== "button" && (
                        <td className="px-6 py-4">{item[field.field]}</td>
                      )}
                    {field.option1 == "button" && (
                      <td className="px-6 py-4 text-right">
                        <button
                          className="relative font-bold text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 dark:after:bg-white 
      after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                          onClick={() => {
                            onClickEdit(item);
                          }}
                        >
                          تعديل
                        </button>
                      </td>
                    )}
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
