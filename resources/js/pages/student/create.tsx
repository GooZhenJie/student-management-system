import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gender, StudentStatus } from '@/enums';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type CreateStudentForm = {
    name: string;
    student_id: string;
    email: string;
    phone_number: string;
    address: string;
    gender: string;
    status: string;
    date_of_birth: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student',
        href: '/student',
    },
    {
        title: 'Create',
        href: '#',
    },
];

export default function Create() {
    const { genders, statuses } = usePage<{
        genders: Array<{ key: string; value: string }>;
        statuses: Array<{ key: string; value: string }>;
    }>().props;

    const { data, setData, post, processing, errors } = useForm<Required<CreateStudentForm>>({
        name: '',
        student_id: '',
        email: '',
        phone_number: '',
        address: '',
        gender: '',
        status: '',
        date_of_birth: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/student');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Student" />

            {/* Parent Container with Grid Layout */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Student Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Student Name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="student_id">Student ID</Label>
                            <Input
                                id="student_id"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="student_id"
                                value={data.student_id}
                                onChange={(e) => setData('student_id', e.target.value)}
                                placeholder="Student ID"
                            />
                            <InputError message={errors.student_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={3}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input
                                id="phone_number"
                                type="text"
                                required
                                tabIndex={4}
                                autoComplete="phone_number"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                placeholder="Phone Number"
                            />
                            <InputError message={errors.phone_number} />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                type="text"
                                required
                                tabIndex={5}
                                autoComplete="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Address"
                            />
                            <InputError message={errors.address} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                            <Input
                                id="date_of_birth"
                                type="date"
                                required
                                tabIndex={7}
                                value={data.date_of_birth}
                                onChange={(e) => setData('date_of_birth', e.target.value)}
                            />
                            <InputError message={errors.date_of_birth} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                required
                                name="gender"
                                autoComplete="gender"
                                value={data.gender}
                                onValueChange={(e: Gender) => setData('gender', e)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>

                                <SelectContent>
                                    {genders.map((gender) => (
                                        <SelectItem key={gender.value} value={gender.value}>
                                            {gender.key}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.gender} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                required
                                name="status"
                                autoComplete="status"
                                defaultValue={StudentStatus.ACTIVE}
                                value={data.status}
                                onValueChange={(e: StudentStatus) => setData('status', e)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
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
                        <Button disabled={processing}>Create Student</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
