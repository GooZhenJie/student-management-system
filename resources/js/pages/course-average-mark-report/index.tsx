import DataTable from '@/components/DataTable/DataTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Column } from 'primereact/column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Course Average Mark Report',
        href: '#',
    },
];

export default function Index() {
    const { courseAverageMarkReport } = usePage().props;

    console.log(courseAverageMarkReport);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Course Average Mark Report" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable value={courseAverageMarkReport}>
                    <Column header="Course Title" field="title"></Column>
                    <Column header="Course Code" field="code"></Column>
                    <Column header="Average Mark" field="average_mark"></Column>
                </DataTable>
            </div>
        </AppLayout>
    );
}
