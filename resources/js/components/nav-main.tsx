import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url: currentUrl } = usePage();
    const { state } = useSidebar();

    const hasActiveChild = (item: NavItem): boolean => {
        if (item.href === currentUrl) return true;
        if (item.children) return item.children.some(hasActiveChild);
        return false;
    };

    const renderItem = (item: NavItem) => {
        if (item.children) {
            const isActive = hasActiveChild(item);

            return (
                <Collapsible key={item.title} defaultOpen={isActive}>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                                isActive={isActive}
                                tooltip={{
                                    children: item.title,
                                    side: 'right',
                                }}
                            >
                                {item.icon && <item.icon />}
                                {state === 'expanded' && (
                                    <>
                                        <span>{item.title}</span>
                                        <ChevronDownIcon className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </>
                                )}
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                    </SidebarMenuItem>

                    {state === 'expanded' && (
                        <CollapsibleContent>
                            <SidebarMenu className="pl-6">{item.children.map(renderItem)}</SidebarMenu>
                        </CollapsibleContent>
                    )}
                </Collapsible>
            );
        }

        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                    asChild
                    isActive={item.href === currentUrl}
                    tooltip={{
                        children: item.title,
                        side: 'right',
                    }}
                >
                    <Link href={item.href!} prefetch>
                        {item.icon && <item.icon />}
                        {state === 'expanded' && <span>{item.title}</span>}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>{items.map(renderItem)}</SidebarMenu>
        </SidebarGroup>
    );
}
