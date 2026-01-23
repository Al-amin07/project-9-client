import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteModal({
    name,
    onDelete,
}: {
    name?: string;
    onDelete?: () => void;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="border-0 text-sm cursor-pointer hover:bg-red-50 px-2.5 py-1.5 text-red-600">
                    Delete {name || "User"}
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete {name || "User"}?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to delete {name || "this user"}?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>

                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>

                        <Button variant="default" onClick={onDelete}>
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
