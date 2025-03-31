import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export function AddExamMarksDialog({ exam }: { exam: Exam }) {
    const { course } = usePage<{
        course: Course;
    }>().props;

    const [isOpen, setIsOpen] = useState(false);
    const { processing } = useForm();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        router.post(
            `/exam-mark`,
            {
                student_id: form.student_id.value,
                exam_id: exam.id,
                marks: form.marks.value,
                course_id: course.id, // Include course_id if needed
            },
            {
                onSuccess: () => {
                    setIsOpen(false); // Close dialog on success
                    router.reload({ only: ['course'] }); // Reload necessary data
                },
                preserveScroll: true,
            },
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Add Marks
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Exam Marks</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="student_id">Student</Label>
                        <Select name="student_id" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select student" />
                            </SelectTrigger>
                            <SelectContent>
                                {course.students.length > 0 ? (
                                    course.students.map((student) => (
                                        <SelectItem key={student.id} value={student.id.toString()}>
                                            {student.name} ({student.student_id})
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground px-4 py-2 text-sm">No students available</div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="marks">Marks</Label>
                        <Input id="marks" name="marks" type="number" min="0" max="100" step="0.01" required />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Marks'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
