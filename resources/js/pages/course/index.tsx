import CourseLevel from '@/components/Course/course-level';
import CourseStatus from '@/components/Course/course-status';
import DataTable from '@/components/DataTable/DataTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Column } from 'primereact/column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Course',
        href: '/course',
    },
];

export default function Index() {
    const { courses } = usePage<{ courses: Course[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Course" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable model="course" value={courses}>
                    <Column header="Course Code" field="code"></Column>
                    <Column header="Title" field="title"></Column>
                    <Column header="Credit Hours" field="credit_hours"></Column>
                    <Column header="Level" body={(course) => <CourseLevel course={course} />}></Column>
                    <Column header="Status" body={(course) => <CourseStatus course={course} />}></Column>
                </DataTable>
            </div>
        </AppLayout>
    );
}
