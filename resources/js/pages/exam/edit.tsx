import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type EditExamForm = {
    name: string;
    description: string;
    date: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Exam',
        href: '/exam',
    },
    {
        title: 'Update',
        href: '#',
    },
];

export default function Edit() {
    const { exam } = usePage<{
        exam: Exam;
    }>().props;

    const { data, setData, patch, processing, errors } = useForm<Required<EditExamForm>>({
        name: exam.name,
        description: exam.description,
        date: exam.date,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(`/exam/${exam.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Exam" />

            {/* Parent Container with Grid Layout */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Exam Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="off"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Exam Name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="off"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Exam Description"
                            />
                            <InputError message={errors.description} />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="date">Exam Date</Label>
                            <Input
                                id="date"
                                type="date"
                                required
                                tabIndex={3}
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                            />
                            <InputError message={errors.date} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end md:col-span-2">
                        <Button disabled={processing}>Update Exam</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
