/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link, router } from '@inertiajs/react';
import { Download, Pencil, Plus, X } from 'lucide-react';
import { Column } from 'primereact/column';
import { DataTable as BaseDataTable } from 'primereact/datatable';
import { ReactNode, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface Props {
    model?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    children: ReactNode;
}

export default function DataTable({ model, value, children }: Props) {
    const dataTableRef = useRef(null);
    const [deleteDialogState, setDeleteDialogState] = useState<{
        isOpen: boolean;
        deletingId: number | null;
    }>({ isOpen: false, deletingId: null });

    const hasAction = model;

    const exportCSV = (selectionOnly: boolean) => {
        // @ts-expect-error
        dataTableRef.current?.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDFModule) => {
            import('jspdf-autotable').then((autoTableModule) => {
                const doc = new jsPDFModule.default('p', 'pt');

                // @ts-expect-error
                const dataTable = dataTableRef.current?.getElement();
                if (!dataTable) return;

                // Get all columns except the last one (action column)
                const columns = Array.from(dataTable.querySelectorAll('thead th'));
                const dataColumns = hasAction ? columns.slice(0, -1) : columns;

                // @ts-expect-error
                const headers = dataColumns.map((th) => th.textContent?.trim() || '');

                const rows = Array.from(dataTable.querySelectorAll('tbody tr'))
                    .map((tr) => {
                        // @ts-expect-error
                        const cells = Array.from(tr.querySelectorAll('td'));
                        return hasAction ? cells.slice(0, -1) : cells;
                    })
                    // @ts-expect-error
                    .map((cells) => cells.map((td) => td.textContent?.trim() || ''));

                // Generate the table
                autoTableModule.default(doc, {
                    head: [headers],
                    body: rows,
                    startY: 60,
                    styles: {
                        fontSize: 8,
                        cellPadding: 2,
                    },
                    headStyles: {
                        fillColor: [41, 128, 185],
                        textColor: 255,
                        fontSize: 9,
                        fontStyle: 'bold',
                    },
                    alternateRowStyles: {
                        fillColor: [245, 245, 245],
                    },
                });

                // Save the PDF
                doc.save(`${'Data'}_export_${new Date().getTime()}.pdf`);
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const exportableFields = value.map((value: any) => value.exportable);

            const worksheet = xlsx.utils.json_to_sheet(exportableFields);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });

            saveAsExcelFile(excelBuffer, new Date().toLocaleDateString());
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveAsExcelFile = (buffer: any, fileName: string) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const handleDelete = () => {
        if (!deleteDialogState.deletingId) return;

        router.delete(`/${model}/${deleteDialogState.deletingId}`, {
            onSuccess: () => {
                setDeleteDialogState({ isOpen: false, deletingId: null });
            },
            preserveScroll: true,
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actions = (data: any) => {
        if (!hasAction) return <></>;

        return (
            <div className="flex items-center gap-2">
                {/* Edit Button */}
                <Link href={`${model}/${data.id}/edit`} method="get">
                    <Button variant="outline" size="sm" className="gap-1">
                        <Pencil />
                        <span className="sr-only md:not-sr-only">Edit</span>
                    </Button>
                </Link>

                {/* Delete Dialog */}
                <Dialog
                    open={deleteDialogState.isOpen && deleteDialogState.deletingId === data.id}
                    onOpenChange={(open) =>
                        setDeleteDialogState({
                            isOpen: open,
                            deletingId: open ? data.id : null,
                        })
                    }
                >
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="gap-1"
                            onClick={() =>
                                setDeleteDialogState({
                                    isOpen: true,
                                    deletingId: data.id,
                                })
                            }
                        >
                            <X />
                            <span className="sr-only md:not-sr-only">Delete</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>Are you sure you want to delete this record? This action cannot be undone.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2 sm:space-x-0">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setDeleteDialogState({
                                            isOpen: false,
                                            deletingId: null,
                                        })
                                    }
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button variant="destructive" className="gap-1" onClick={handleDelete} disabled={!deleteDialogState.deletingId}>
                                Confirm Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        );
    };

    return (
        <>
            <div className="flex justify-end gap-2">
                {hasAction && (
                    <Link href={route(`${model}.create`)}>
                        <Button variant={'outline'}>
                            <Plus />
                            Create New
                        </Button>
                    </Link>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-md">
                            <Download />
                            <span className="sr-only">Download</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => exportCSV(false)}>
                            <span className="flex items-center gap-2">CSV</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={exportExcel}>
                            <span className="flex items-center gap-2">Excel</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={exportPdf}>
                            <span className="flex items-center gap-2">PDF</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <BaseDataTable
                ref={dataTableRef}
                value={value}
                tableStyle={{ fontSize: '0.875rem' }}
                showGridlines
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50, 100]}
                size={'small'}
            >
                {children}
                {hasAction && <Column header="Action" body={actions}></Column>}
            </BaseDataTable>
        </>
    );
}
