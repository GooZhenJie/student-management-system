export default function StudentStatus({ student }: { student: Student }) {
    const classes: Record<string, string> = {
        active: 'bg-emerald-200 text-emerald-900 shadow-sm',
        inactive: 'bg-zinc-300 text-zinc-900 shadow-sm',
        graduated: 'bg-indigo-200 text-indigo-900 shadow-sm',
        suspended: 'bg-rose-200 text-rose-900 shadow-sm',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold ${classes[student.status]}`}>
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
    );
}
