import DataTable from '@/components/DataTable/DataTable';
import StudentStatus from '@/components/Student/student-status';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Column } from 'primereact/column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student',
        href: '/student',
    },
];

export default function Index() {
    const { students } = usePage<{ students: Student[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable model="student" value={students}>
                    <Column header="Name" field="name"></Column>
                    <Column header="Student ID" field="student_id"></Column>
                    <Column header="Email" field="email"></Column>
                    <Column header="Status" body={(student) => <StudentStatus student={student} />}></Column>
                </DataTable>
            </div>
        </AppLayout>
    );
}
