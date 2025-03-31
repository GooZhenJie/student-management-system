export default function CourseStatus({ course }: { course: Course }) {
    const classes: Record<string, string> = {
        active: 'bg-emerald-200 text-emerald-900 shadow-sm',
        inactive: 'bg-zinc-300 text-zinc-900 shadow-sm',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold ${classes[course.status]}`}>
            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
        </span>
    );
}
