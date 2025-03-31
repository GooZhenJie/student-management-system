interface Course {
    id: number;
    code: string;
    title: string;
    description: string;
    credit_hours: string;
    level: string;
    status: string;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;

    students: Student[];
    exams: Exam[];
}
