import Sidebar from "../../component/Sidebar/Sidebar";
import Table from "../../component/Table/Table";
import React, { useState, useEffect } from "react";
import useNetworkService from "../../component/Network/NetworkServise";
import { Button, Modal, FloatingLabel, Select } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import style from "./AllDistricts.module.css";
interface ColumnMeta {
  field: string;
  fieldId?: string;
  header: string;
  type?: string;
  expander?: boolean;
  selectKind?: string;
  selectKindMessage?: { option: string; value: boolean }[];
  option1?: string;
  edit: boolean;
}
export default function AllDistricts() {
  const columns: ColumnMeta[] = [
    {
      field: "name",
      header: "اسم الادارة",
      type: "text",
      expander: true,
      edit: true,
    },
    {
      field: "itCenterCode",
      type: "text",
      header: "كود مركز المعلومات",
      edit: true,
    },
    {
      field: "nameGovernorate",
      fieldId: "idGovernorate",
      type: "dropdown",
      header: "المحافظة",
      edit: true,
    },
    {
      field: "goveronrateDirationName",
      type: "text",
      header: "وجهة المحافظة",
      edit: false,
    },
    {
      field: "comprehensiveHealthInsurance",
      type: "dropdown",
      selectKind: "boolean",
      selectKindMessage: [
        { option: "نعم", value: true },
        { option: "لا", value: false },
      ],
      header: "داخل التأمين الصحي الشامل",
      edit: true,
    },
    {
      field: "isActive",
      type: "dropdown",
      selectKind: "boolean",
      selectKindMessage: [
        { option: "نشط", value: true },
        { option: "غير نشط", value: false },
      ],
      header: "الحالة",
      edit: true,
    },
    { field: "type", header: "اختيارات", option1: "button", edit: false },
  ];
  interface MyFormValues {
    id: number;
    name: string;
    itCenterCode: string;
    nameGovernorate: string;
    idGovernorate: number;
    goveronrateDirationName: string;
    comprehensiveHealthInsurance: string | boolean;
    isActive: string | boolean;
  }
  const { getData, updateData, getOptionsDrobdown } = useNetworkService();
  const [nodes, setNodes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState<MyFormValues>({
    id: 0,
    name: "",
    itCenterCode: "",
    nameGovernorate: "",
    idGovernorate: 0,
    goveronrateDirationName: "",
    comprehensiveHealthInsurance: "",
    isActive: "",
  });
  const [intialValues, setIntialValues] = useState({
    id: 0,
    name: "",
    itCenterCode: "",
    nameGovernorate: "",
    idGovernorate: 0,
    goveronrateDirationName: "",
    comprehensiveHealthInsurance: "",
    isActive: "",
  });

  const [Governorates, setGovernorates] = useState([]);
  useEffect(() => {
    if (nodes.length === 0) {
      getData().then((data) => setNodes(data.districtsOnPage));
      console.log("reset");
    }
    setIntialValues({
      id: item.id,
      name: item.name,
      itCenterCode: item.itCenterCode,
      nameGovernorate: item.nameGovernorate,
      idGovernorate: item.idGovernorate,
      goveronrateDirationName: item.goveronrateDirationName,
      comprehensiveHealthInsurance: item.comprehensiveHealthInsurance,
      isActive: item.isActive,
    });
  }, [item]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  const onClickEdit = async (data: any) => {
    setOpenModal(true);
    setItem(data);
    const GovernoratesData = await getOptionsDrobdown(
      `https://localhost:44323/api/Governorate/ActiveGovernorates`
    );
    setGovernorates(GovernoratesData);
  };
  function onCloseModal() {
    setOpenModal(false);
  }
  function update(values: MyFormValues) {
    console.log(values);
    let data = {
      itCenterCode: values.itCenterCode,
      name: values.name,
      comprehensiveHealthInsurance:
        values.comprehensiveHealthInsurance === "true" ||
        values.comprehensiveHealthInsurance === true,
      idGovernorate: values.idGovernorate,
      isActive: values.isActive === "true" || values.isActive === true,
      createdBy: "string",
      createdDate: "2024-09-20T12:36:25.185Z",
      updatedBy: "string",
      updatedDate: "2024-09-20T12:36:25.185Z",
    };
    updateData(data, values.id);
    const updatedNodes = nodes.map((element) =>
      element.id === values.id
        ? {
            id: values.id,
            name: values.name,
            itCenterCode: values.itCenterCode,
            nameGovernorate: values.nameGovernorate,
            idGovernorate: values.idGovernorate,
            goveronrateDirationName: values.goveronrateDirationName,
            comprehensiveHealthInsurance:
              values.comprehensiveHealthInsurance === "true" ||
              values.comprehensiveHealthInsurance === true,
            isActive: values.isActive === "true" || values.isActive === true,
          }
        : element
    );
    setNodes(updatedNodes);
  }
  const formik = useFormik({
    // to make intial values change with every state change [intialValues,setIntialValues]
    enableReinitialize: true,
    initialValues: intialValues,
    onSubmit: (values) => {
      console.log(values);
      update(values);
    },
  });
  return (
    <>
      <div className={`${style.containerStyle} container flex`}>
        <Sidebar />
        <Table
          columns={columns}
          nodes={nodes}
          intialValues={intialValues}
          onClickEdit={onClickEdit}
        />
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <h1 className="mb-2">تعديل البيانات</h1>

            <form onSubmit={formik.handleSubmit}>
              {columns.map((input, inputIndex) => (
                <React.Fragment key={`input-${inputIndex}`}>
                  {input.edit == true && input.type == "text" && (
                    <div className={`${input.field}`}>
                      <FloatingLabel
                        id={input.field}
                        name={input.field}
                        variant="outlined"
                        defaultValue={item[input.field]}
                        label={input.header}
                        onChange={formik.handleChange}
                      />
                    </div>
                  )}

                  {input.edit == true && input.type == "dropdown" && (
                    <div className={`${input.field} max-w-md`}>
                      {input.selectKind !== "boolean" && (
                        <Select
                          id="idGovernorate"
                          className="mt-2"
                          required
                          onChange={(e) => {
                            formik.setFieldValue(
                              "idGovernorate",
                              e.target.value
                            ); // تعيين id في النموذج
                            formik.setFieldValue(
                              "nameGovernorate",
                              e.target.options[e.target.selectedIndex].text
                            ); // تعيين name في النموذج
                          }}
                          defaultValue={item["idGovernorate"]}
                        >
                          <>
                            <option value={item["idGovernorate"]}>
                              {item["nameGovernorate"]}
                            </option>
                            {Governorates?.map((option, optionIndex) => (
                              <option
                                key={`govOption${optionIndex}`}
                                value={option.id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </>
                        </Select>
                      )}
                      {input.selectKind == "boolean" && (
                        <Select
                          id={input.field}
                          className="mt-2"
                          required
                          onChange={formik.handleChange}
                          defaultValue={item[input.field] == "true"}
                        >
                          {input.selectKind == "boolean" && (
                            <>
                              <option>
                                {item[input.field]
                                  ? input.selectKindMessage[0].option
                                  : input.selectKindMessage[1].option}
                              </option>
                              {input.selectKindMessage?.map(
                                (message, messageIndex) => (
                                  <option
                                    key={`message-${messageIndex}`}
                                    value={message.value}
                                  >
                                    {message.option}
                                  </option>
                                )
                              )}
                            </>
                          )}
                        </Select>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}

              <div className=" flex justify-center">
                <button
                  className="cursor-pointer bg-blue-600 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-600 hover:ring-2 hover:ring-blue-600 hover:shadow-xl hover:shadow-blue-300 focus:ring-blue-300 focus:shadow-blue-400 px-5 py-2
                mt-3"
                  type="submit"
                >
                  تعديل
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
