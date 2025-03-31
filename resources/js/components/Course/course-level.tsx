export default function CourseLevel({ course }: { course: Course }) {
    const classes: Record<string, string> = {
      beginner: 'bg-gradient-to-r from-green-200 to-green-400 text-green-900 shadow-sm',
      intermediate: 'bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 shadow-sm',
      advanced: 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 shadow-sm',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold ${classes[course.level]}`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </span>
    );
}
