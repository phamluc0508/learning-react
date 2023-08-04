import React, { useEffect, useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from "primereact/dialog";
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import './styleFormInput.css';
export default function DetailProduct(props) {

    const { visible, formInput, saveFormInput, closeForm, products, editClick, addClick } = props;
    const [type, setType] = useState("create");
    const [detail, setDetail] = useState({ code: "", name: "", detail: "", family: "", solution: "", unit: "", warranty: "" });
    const [message, setMessage] = useState({ code: "", name: "", family: "" });
    const toast = useRef(null);

    useEffect(() => {
        setType("edit");
        setDetail(formInput)
    }, [editClick])

    useEffect(() => {
        setType("create");
        setDetail({ code: "", name: "", detail: "", family: "", solution: "", unit: "", warranty: "" })
    }, [addClick])

    const validate = (value, key) => {
        let _message = { ...message };
        switch (key) {
            case "code":
                if (!value) {
                    _message.code = "Product ID is required";
                }
                else if (/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/? ]+/.test(value)) {
                    _message.code = 'Product ID allow only alphanumeric characters, "-" and "_"';
                }
                // else if (products) {
                //         if (value != formInput.code) {
                //             for (let e of products) {
                //                 if (e.code === value) {
                //                     _message.code = e.code + " already exists please choose another code";
                //                     break;
                //                 }
                //             }
                //         }
                // }
                else
                    _message.code = "";
                break;
            case "name":

                if (!value) {
                    _message.name = "Product name is required";
                }
                else if (/[!@#$%^&*()+-\=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
                    _message.name = 'Product name allow only letters, numbers and spaces';
                }
                else
                    _message.name = "";
                break;

            case "family":
                !value ? _message.family = "Product family is required" : _message.family = "";
                break;
            default:
                break;
        }

        setMessage(_message);

        if (!_message.code && !_message.name && !_message.family) {
            return true;
        }

    }

    const onChangeDetail = (value, key) => {
        let _detail = { ...detail };

        console.log(_detail)
        validate(value, key);
        _detail[key] = value;
        console.log(_detail)
        setDetail(_detail);
        console.log(detail)
    }

    const checkSave = () => {
        let _message = { ...message };
        console.log(_message)
        console.log(detail)
        if (_message.code === "" && detail.code === "")
            _message.code = "Product code is required";
        if (!_message.code && products) {
            if (detail.code != formInput.code) {
                for (let e of products) {
                    if (e.code === detail.code) {
                        _message.code = e.code + " already exists please choose another code";
                        break;
                    }
                }
            }
        }
        if (_message.name === "" && detail.name === "")
            _message.name = "Product name is required";
        if (_message.family === "" && detail.family === "")
            _message.family = "Product family is required";

        if (_message.code === "" && _message.name === "" && _message.family === "") {
            return true;
        } else {
            setMessage(_message)
            return _message;
        }
    }

    const clickSaveHandle = () => {
        if (checkSave() === true) {
            saveFormInput(type, detail);
            showSaveSuccess();
            setDetail({ code: "", name: "", detail: "", family: "", solution: "", unit: "", warranty: "" })
        }
        else {
            showError(checkSave());
        }
    }

    const showSaveSuccess = () => {
        toast.current.show({ severity: 'success', summary: '', detail: 'Save Successful', life: 3000 });
    }

    const showError = (message) => {
        const arr = [];
        if (message.code) arr.push(message.code);
        if (message.name) arr.push(message.name);
        if (message.family) arr.push(message.family);

        toast.current.show({
            severity: 'error', summary: 'Error',
            detail: (
                <ul>
                    {arr.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ),
            life: 3000
        });
    };

    const header = () => {
        return (
            <div>
                <div className="text-center text-2xl py-1">{type === "create" ? "Add new product" : "Edit product"}</div>
            </div>
        );
    };

    const footer = () => {
        return (
            <div>
                <Button
                    label="Cancel"
                    onClick={() => {

                        closeForm();
                        setMessage({ code: "", name: "", family: "" });
                        setDetail({ code: "", name: "", detail: "", family: "", solution: "", unit: "", warranty: "" })
                    }}
                    className="p-button-text"
                />
                <Button
                    onClick={clickSaveHandle}
                    label="Save"
                    icon="pi pi-save"
                    autoFocus
                />
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <Dialog className="crm-detail"
                header={header}
                visible={visible}
                onHide={() => {
                    closeForm();
                    setMessage({ code: "", name: "", family: "" });
                    setDetail({ code: "", name: "", detail: "", family: "", solution: "", unit: "", warranty: "" })
                }}
                breakpoints={{ "960px": "75vw" }}
                footer={footer}
            >
                <div className="p-2">
                    <form
                        id="my-form"
                        className="p-fluid fluid formgrid grid"
                    >
                        <div className="col-6 px-3 py-1">
                            <div className="flex py-1 h-full mx-2">
                                <div className="field-preview-label pt-2">
                                    <div className="field-preview-label-text">
                                        <div className="field-require text-sm">Product ID</div>
                                    </div>
                                </div>
                                <div className="pt-2 flex-1 overflow-hidden field-content">
                                    <div className="field">
                                        <span>
                                            <InputText
                                                value={detail.code}
                                                onChange={(e) => onChangeDetail(e.target.value, "code")}
                                            />
                                        </span>
                                        <small className="fix-input">{message.code}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 px-3 py-1">
                            <div className="flex py-1 h-full mx-2">
                                <div className="field-preview-label pt-2">
                                    <div className="field-preview-label-text">
                                        <div className="field-require text-sm">Product Name</div>
                                    </div>
                                </div>
                                <div className="pt-2 flex-1 overflow-hidden field-content">
                                    <div className="field">
                                        <span className="">
                                            <InputText
                                                value={detail.name}
                                                onChange={(e) => onChangeDetail(e.target.value, "name")}
                                            />
                                        </span>
                                        <small className="fix-input">{message.name}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 px-3 py-1">
                            <div className="flex py-1 h-full mx-2">
                                <div className="field-preview-label pt-2">
                                    <div className="field-preview-label-text">
                                        <div className="field-require text-sm">Product Family</div>
                                    </div>
                                </div>
                                <div className="pt-2 flex-1 overflow-hidden field-content">
                                    <div className="field">
                                        <span className="">
                                            <InputText
                                                value={detail.family}
                                                onChange={(e) => onChangeDetail(e.target.value, "family")}
                                            />
                                        </span>
                                        <small className="fix-input">{message.family}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 px-3 py-1">
                            <div className="flex py-1 h-full mx-2">
                                <div className="field-preview-label pt-2">
                                    <div className="field-preview-label-text">
                                        <div className="text-sm">Warranty duration</div>
                                    </div>
                                </div>
                                <div className="pt-2 flex-1 overflow-hidden field-content">
                                    <div className="field">
                                        <span className="">
                                            <InputNumber
                                                value={detail.warranty}
                                                onValueChange={(e) => onChangeDetail(e.target.value, "warranty")}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 px-3 py-1">
                            <div className="flex py-1 h-full mx-2">
                                <div className="field-preview-label pt-2">
                                    <div className="field-preview-label-text">
                                        <div className="text-sm">Solution Type</div>
                                    </div>
                                </div>
                                <div className="pt-2 flex-1 overflow-hidden field-content">
                                    <div className="field">
                                        <span className="">
                                            <InputText
                                                value={detail.solution}
                                                onChange={(e) => onChangeDetail(e.target.value, "solution")}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 px-3 py-1">
                            <div className="flex py-1 h-full mx-2">
                                <div className="field-preview-label pt-2">
                                    <div className="field-preview-label-text">
                                        <div className="text-sm">Duration unit</div>
                                    </div>
                                </div>
                                <div className="pt-2 flex-1 overflow-hidden field-content">
                                    <div className="field">
                                        <span className="">
                                            <InputText
                                                value={detail.unit}
                                                onChange={(e) => onChangeDetail(e.target.value, "unit")}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 px-3 py-1">
                            <div className="flex py-1 h-full mx-2">
                                <div className="field-preview-label pt-2">
                                    <div className="field-preview-label-text">
                                        <div className="text-sm">Description</div>
                                    </div>
                                </div>
                                <div className="pt-2 flex-1 overflow-hidden field-content">
                                    <div className="field">
                                        <span className="">
                                            <InputTextarea
                                                defaultValue={detail.detail}
                                                onChange={(e) => onChangeDetail(e.target.value, "detail")}
                                                rows={5}
                                                cols={30}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </Dialog>

        </div>
    );
}