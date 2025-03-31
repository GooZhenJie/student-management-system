import DataTable from '@/components/DataTable/DataTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Column } from 'primereact/column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Exam',
        href: '/exam',
    },
];

export default function Index() {
    const { exams } = usePage<{ exams: Exam[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exam" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable model="exam" value={exams}>
                    <Column header="Exam" field="name"></Column>
                    <Column header="Description" field="description"></Column>
                    <Column header="Exam Date" field="date"></Column>
                </DataTable>
            </div>
        </AppLayout>
    );
}
