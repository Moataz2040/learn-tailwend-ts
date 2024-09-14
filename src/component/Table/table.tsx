import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import useNetworkService from '../Network/NetworkServise';

interface ColumnMeta {
    field: string;
    header: string;
    expander?: boolean;
}

interface Product {
    id: string;
    itCenterCode: string;
    name: string;
    nameGovernorate: string;
    goveronrateDirationName: string;
    comprehensiveHealthInsurance: boolean;
    isActive: boolean;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

export default function DynamicColumnsDemo() {
    const columns: ColumnMeta[] = [
        { field: 'name', header: 'اسم الادارة', expander: true },
        { field: 'itCenterCode', header: 'كود مركز المعلومات' },
        { field: 'nameGovernorate', header: 'المحافظة' },
        { field: 'goveronrateDirationName', header: 'وجهة المحافظة' },
        { field: 'comprehensiveHealthInsurance', header: 'داخل التأمين الصحي الشامل' },
        { field: 'isActive', header: 'الحالة' },
        { field: 'type', header: 'اختيارات' },
    ];

    const { getData } = useNetworkService();
    const [nodes, setNodes] = useState<TreeNode[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData();
                const treeData: TreeNode[] = result.districtsOnPage.map((item: Product) => {
                    console.log(item);
                    
                    return {
                    key: item.id,
                    data: {
                        name: item.name,
                        itCenterCode: item.itCenterCode,
                        nameGovernorate: item.nameGovernorate,
                        governonrateDirationName: item.goveronrateDirationName,
                        comprehensiveHealthInsurance: item.comprehensiveHealthInsurance?'نشط':'غير نشط',
                        isActive: item.isActive?'نشط':'غير نشط',
                    },
                    icon: 'pi pi-fw pi-home', // يمكنك تخصيص الأيقونة
                    // أضف خصائص children إذا كان لديك عقد فرعية
                }});
                setNodes(treeData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [getData]);

    return (
        <div className="card">
            <TreeTable value={nodes} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} expander={col.expander} />
                ))}
            </TreeTable>
        </div>
    );
}
