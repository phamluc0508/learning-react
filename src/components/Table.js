import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DetailProduct from "./detailProduct";
import './styleFormInput.css';
import { FilterMatchMode } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { Icon } from "@iconify/react";

export default function Table() {
    const [addClick, setAddClick] = useState(0)
    const [editClick, setEditClick] = useState(0)
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [formInput, setFormInput] = useState({});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        "code": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "family": { value: null, matchMode: FilterMatchMode.IN }
    });
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [rowClick, setRowClick] = useState(true);

    const optiionView = [
        {
            label: 'Table',
            icon: <Icon
                icon={"bx:table"}
                fontSize={"1.5 vw"}
                style={{ color: "rgba(0, 0, 0, 0.6)", marginRight: "0.5rem" }}
            />
        },
        {
            label: 'Kanban',
            icon: <Icon
                icon={"bx:table"}
                fontSize={"1.5 vw"}
                style={{ color: "rgba(0, 0, 0, 0.6)", marginRight: "0.5rem" }}
            />
        },
        {
            label: 'Split View',
            icon: <Icon
                icon={"bx:table"}
                fontSize={"1.5 vw"}
                style={{ color: "rgba(0, 0, 0, 0.6)", marginRight: "0.5rem" }}
            />
        }
    ];
    let columns = [
        { field: 'code', header: 'Product Id' },
        { field: 'name', header: 'Product Name' },
        { field: 'detail', header: 'Description' },
        { field: 'family', header: 'Product Family' }
    ];

    const [visibleColumns, setVisibleColumns] = useState(columns);
    useEffect(() => { loadProducts() }, []);

    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

        setVisibleColumns(orderedSelectedColumns);
    };
    const loadProducts = () => {
        let _products = JSON.parse(localStorage.getItem("data_product"));
        setProducts(_products);
    }

    const ClickAddHandle = () => {

        setVisible(true);
        setFormInput({ code: "", name: "", detail: "", family: "", solution: "", unit: "", warranty: "" });
    };

    const ClickEditHandle = (rowData) => {
        setVisible(true);
        setFormInput(rowData);
    };

    const saveFormInput = (type, detail) => {

        let local_products = [];

        if (products) {
            local_products = [...products];
        }

        if (type === "create") {
            let _products = { ...detail };
            if (local_products.length === 0) {
                localStorage.setItem("data_product", JSON.stringify([_products]));
            } else {
                local_products.unshift(_products);
                localStorage.setItem("data_product", JSON.stringify(local_products));
            }
        }
        else {
            for (let i = 0; i < local_products.length; i++) {
                if (local_products[i].code === formInput.code) {
                    local_products[i].code = detail.code;
                    local_products[i].name = detail.name;
                    local_products[i].detail = detail.detail;
                    local_products[i].family = detail.family;
                    local_products[i].solution = detail.solution;
                    local_products[i].unit = detail.unit;
                    local_products[i].warranty = detail.warranty;
                    break;
                }
            }
            localStorage.setItem("data_product", JSON.stringify(local_products));
        }
        loadProducts();
        setVisible(false);
    }

    const renderHeader = () => {
        return (
            <div className='flex justify-content-between p-0'>
                <div className='flex align-items-center justify-content-start'>
                    <Icon icon="bx:data" style={{fontSize: '2.25em', backgroundColor: '#b862d6', color:'white', borderRadius:'3px', padding:'4px'}} /> 
                    <div className='ms-2'>
                        <span className='m-0 fs-6'>Products</span>
                        <div>
                            <MultiSelect className='me-2' value={visibleColumns} options={columns} onChange={onColumnToggle} optionLabel="header" style={{width:'20em', backgroundColor:'#f5f5f5'}} />
                            <Button className='px-2 py-3 m-0' style={{backgroundColor:'white', color:'blue'}}><Icon icon="bxs:pin"  /></Button>
                        </div>           
                    </div>   
                </div>
                <div>
                    <div className="flex justify-content-end">
                        <span className="p-buttonset">
                            <Button className='buttonHeader' label="New" tooltip="New" tooltipOptions={{ position: "top" }}
                                onClick={() => {
                                    setAddClick(current => current + 1)
                                    ClickAddHandle()
                                }} />
                            <Button className='buttonHeader' label="Export" tooltip="Export" tooltipOptions={{ position: "top" }} />
                            <Button className='buttonHeader' label="Print Interface" tooltip="Print Interface" tooltipOptions={{ position: "top" }} />
                        </span>
                    </div>
                    <div className="flex justify-content-end">
                        <span className="p-input-icon-left">
                            <Icon icon="icon-park-outline:search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" style={{ width: "25vw", height: "2.5vw" }} />
                        </span>
                        <span className="d-flex justify-content-end align-items-center" >
                            <SplitButton buttonClassName="hidden" tooltip="View iterface" tooltipOptions={{ position: "top" }}
                                menuButtonClassName="text-color-secondary border-round-sm ms-2 wraper-button"
                                outlined dropdownIcon={<Icon icon={"bx:table"} fontSize={"1.5vw"} />} model={optiionView}
                            />
                            <Button className='mx-2 wraper-button' icon={<Icon icon="ci:arrow-reload-02" fontSize={"1.5vw"} />}
                                severity="secondary" outlined tooltip="Reload the page" tooltipOptions={{ position: "top" }}
                            />
                            <Button className='wraper-button' icon={<Icon icon={"bx:pencil"} fontSize={"1.5vw"} />}
                                severity="secondary" outlined tooltip="Edit watch list" tooltipOptions={{ position: "top" }}
                            />
                        </span>
                    </div>
                </div>
            </div>

        );
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    const buttonEdit = (rowData) => {
        const items = [
            {
                label: 'Edit',
                icon: <Icon
                    icon={"bx:pencil"}
                    fontSize={"1.5vw"}
                    style={{ color: "rgba(0, 0, 0, 0.6)", marginRight: "0.5rem" }}
                />,
                command: () => {
                    setEditClick(current => current + 1)
                    ClickEditHandle(rowData)
                }
            }
        ];
        return (
            <SplitButton className="flex justify-content-center"
                buttonClassName="hidden" tooltip="Edit" tooltipOptions={{ position: "top" }}
                menuButtonClassName="text-color-secondary border-round-sm ms-2 wraper-edit-button"
                outlined dropdownIcon={<Icon icon="bxs:down-arrow" fontSize={"1.25vw"} />} model={items}
            />
        );
    }

    const closeForm = () => {
        setVisible(false);
    }

    return (
        <div>
            <div style={{ height: "calc(100vh - 14px)" }}>
                <DataTable value={products} showGridlines size="small" scrollable scrollHeight='flex' tableStyle={{minWidth: '50rem' }}
                    header={renderHeader} resizableColumns columnResizeMode="expand"
                    filters={filters} globalFilterFields={['code', 'name', 'family']} emptyMessage={<p className='d-flex justify-content-center'>No data found</p>}
                    paginator rows={20} rowsPerPageOptions={[20, 25, 50, 100, 150]}
                    paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink  NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} - {last} of {totalRecords}"
                    selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="code"
                >
                    <Column body={(_, { rowIndex }) => rowIndex + 1} bodyClassName={"p-0 text-center"}></Column>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    {visibleColumns.map((col) => (
                        <Column key={col.field} field={col.field} header={col.header} />
                    ))}
                    <Column body={buttonEdit} header=""></Column>
                </DataTable>
            </div>
            <div>
                <DetailProduct editClick={editClick} addClick={addClick} visible={visible} formInput={formInput} saveFormInput={saveFormInput} closeForm={closeForm} products={products}></DetailProduct>
            </div>
        </div>
    );
}
