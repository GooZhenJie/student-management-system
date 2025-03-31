import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { flash } = usePage().props;

    console.log(flash);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {/* Success Message */}
                {flash?.success && <div className="m-4 rounded bg-green-100 p-4 text-green-700">{flash.success}</div>}

                {/* Error Message */}
                {flash?.error && <div className="m-4 rounded bg-red-100 p-4 text-red-700">{flash.error}</div>}

                {/* Warning Message */}
                {flash?.warning && <div className="m-4 rounded bg-yellow-100 p-4 text-yellow-700">{flash.warning}</div>}
                {children}
            </AppContent>
        </AppShell>
    );
}
