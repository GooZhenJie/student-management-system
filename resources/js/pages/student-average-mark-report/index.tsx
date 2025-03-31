import DataTable from '@/components/DataTable/DataTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Column } from 'primereact/column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Average Mark Report',
        href: '#',
    },
];

export default function Index() {
    const { studentAverageMarkReport } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Average Mark Report" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable value={studentAverageMarkReport}>
                    <Column header="Student Name" field="name"></Column>
                    <Column header="Student ID" field="student_id"></Column>
                    <Column header="Average Mark" field="average_mark"></Column>
                </DataTable>
            </div>
        </AppLayout>
    );
}
