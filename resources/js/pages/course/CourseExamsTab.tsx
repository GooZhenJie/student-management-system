// CourseExamsTab.tsx
import DataTable from '@/components/DataTable/DataTable';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { router, useForm, usePage } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { AddExamMarksDialog } from './AddExamMarksDialog';

export default function CourseExamsTab() {
    const { course, allExams } = usePage<{
        course: Course;
        allExams: Exam[];
    }>().props;

    const { delete: destroy } = useForm();

    const addExam = (examId: string) => {
        router.post(`/course-exams/${course.id}/exams`, {
            exam_id: examId,
        });
    };

    const removeExam = (examId: string) => {
        destroy(`/course-exams/${course.id}/exams/${examId}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Select onValueChange={addExam}>
                    <SelectTrigger className="md:w-[300px]">
                        <span className="text-muted-foreground">{allExams.length === 0 ? 'No available exams to add' : 'Add exam to course'}</span>
                    </SelectTrigger>
                    <SelectContent>
                        {allExams.length > 0 ? (
                            allExams.map((exam) => (
                                <SelectItem key={exam.id} value={exam.id.toString()}>
                                    {exam.name} ({exam.date})
                                </SelectItem>
                            ))
                        ) : (
                            <div className="text-muted-foreground px-4 py-2 text-sm">No exams available to add</div>
                        )}
                    </SelectContent>
                </Select>

                {/* <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Create New Exam</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Exam</DialogTitle>
                        </DialogHeader>
                        <CreateExamForm courseId={course.id} />
                    </DialogContent>
                </Dialog> */}
            </div>

            <DataTable value={course.exams}>
                <Column header="Exam" field="name"></Column>
                <Column header="Description" field="description"></Column>
                <Column header="Exam Date" field="date"></Column>
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <div className="flex justify-center gap-2">
                            <AddExamMarksDialog exam={rowData} />
                            {/* <Button variant="destructive" size="sm" onClick={() => removeExam(rowData.id)}>
                                Remove
                            </Button> */}
                        </div>
                    )}
                ></Column>
            </DataTable>
        </div>
    );
}
