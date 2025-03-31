// CreateExamForm.tsx
export function CreateExamForm({ courseId }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();
        const form = e.target;
        post('/exams', {
            exam_name: form.exam_name.value,
            description: form.description.value,
            exam_date: form.exam_date.value,
            course_id: courseId,
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="exam_name">Exam Name</Label>
                <Input id="exam_name" name="exam_name" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="exam_date">Exam Date</Label>
                <Input id="exam_date" name="exam_date" type="date" required />
            </div>

            <Button type="submit" disabled={processing}>
                Create Exam
            </Button>
        </form>
    );
}
