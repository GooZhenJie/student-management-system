// CourseStudentsTab.tsx
import DataTable from '@/components/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { router, useForm, usePage } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { Column } from 'primereact/column';

export default function CourseStudentsTab() {
    const { course, allStudents } = usePage<{
        course: Course;
        allStudents: Student[];
    }>().props;
    const { delete: destroy } = useForm();

    const addStudent = (studentId: string) => {
        router.post(`/student-courses/${course.id}/students`, {
            student_id: studentId,
        });
    };

    const removeStudent = (studentId: string) => {
        destroy(`/student-courses/${course.id}/students/${studentId}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Select onValueChange={addStudent}>
                    <SelectTrigger className="md:w-[300px]">
                        <span className="text-muted-foreground">
                            {allStudents.length === 0 ? 'No available students to add' : 'Add student to course'}
                        </span>
                    </SelectTrigger>
                    <SelectContent>
                        {allStudents.length > 0 ? (
                            allStudents.map((student) => (
                                <SelectItem key={student.id} value={student.id.toString()}>
                                    {student.name} ({student.student_id})
                                </SelectItem>
                            ))
                        ) : (
                            <div className="text-muted-foreground px-4 py-2 text-sm">No students available to add</div>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <DataTable value={course.students}>
                <Column header="Name" field="name"></Column>
                <Column header="Student ID" field="student_id"></Column>
                <Column header="Email" field="email"></Column>
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <div className='flex justify-center'>
                            <Button variant="destructive" size="sm" onClick={() => removeStudent(rowData.id)}>
                                <Trash2 />
                                <span className="sr-only md:not-sr-only">Remove</span>
                            </Button>
                        </div>
                    )}
                ></Column>
            </DataTable>
        </div>
    );
}
