import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import CourseExamsTab from './CourseExamsTab';
import CourseStudentsTab from './CourseStudentsTab';

type EditCourseForm = {
    code: string;
    title: string;
    description: string;
    credit_hours: string;
    level: string;
    status: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Course',
        href: '/course',
    },
    {
        title: 'Update',
        href: '#',
    },
];

export default function Edit() {
    const { course, levels, statuses, allStudents, allExams } = usePage<{
        course: Course;
        levels: Array<{ key: string; value: string }>;
        statuses: Array<{ key: string; value: string }>;
    }>().props;

    const { data, setData, patch, processing, errors } = useForm<Required<EditCourseForm>>({
        code: course.code,
        title: course.title,
        description: course.description,
        credit_hours: course.credit_hours,
        level: course.level,
        status: course.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(`/course/${course.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Course" />

            {/* Parent Container with Grid Layout */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs defaultValue="course-details">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="course-details">Course Details</TabsTrigger>
                        <TabsTrigger value="students">Students</TabsTrigger>
                        <TabsTrigger value="exams">Exams</TabsTrigger>
                    </TabsList>

                    <TabsContent value="course-details">
                        <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Course Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        required
                                        tabIndex={1}
                                        autoComplete="off"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Course Title"
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="code">Course Code</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="off"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        placeholder="Course Code"
                                        disabled
                                    />
                                    <InputError message={errors.code} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Course Description</Label>
                                    <Input
                                        id="description"
                                        type="text"
                                        required
                                        tabIndex={3}
                                        autoComplete="off"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Course Description"
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="credit_hours">Credit Hours</Label>
                                    <Input
                                        id="credit_hours"
                                        type="number"
                                        required
                                        tabIndex={4}
                                        autoComplete="off"
                                        value={data.credit_hours}
                                        onChange={(e) => setData('credit_hours', e.target.value)}
                                        placeholder="Credit Hours"
                                    />
                                    <InputError message={errors.credit_hours} />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="level">Course Level</Label>
                                    <Select required name="level" value={data.level} onValueChange={(e) => setData('level', e)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Level" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {levels.map((level) => (
                                                <SelectItem key={level.value} value={level.value}>
                                                    {level.key}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.level} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="status">Course Status</Label>
                                    <Select required name="status" value={data.status} onValueChange={(e) => setData('status', e)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {statuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.key}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end md:col-span-2">
                                <Button disabled={processing}>Update Course</Button>
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="students">
                        <CourseStudentsTab />
                    </TabsContent>

                    <TabsContent value="exams">
                        <CourseExamsTab />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
