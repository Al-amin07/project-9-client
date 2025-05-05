import { Button } from "@/components/ui/button"
import {
    Dialog,

    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
    status: z.enum(["ACTIVE", "BLOCKED", "DELETED"], {
        required_error: "Please select a status.",
    }),
});

type FormValues = z.infer<typeof formSchema>;
export function UserUpdateModal({ user, onSubmit }: { user: IUser, onSubmit: (id: string, status: FormValues) => Promise<void> }) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: user?.status
        },
    });

    const handleSubmit = (data: FormValues) => {
        onSubmit(user?.id, data);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="border-0 text-sm cursor-pointer hover:bg-secondary px-2.5 py-1.5 ">Update Status</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-3">Update user status</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-full">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="">
                                                <SelectItem

                                                    value="ACTIVE">Active</SelectItem>
                                                <SelectItem value="BLOCKED">Blocked</SelectItem>
                                                <SelectItem value="DELETED">Deleted</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button variant={"outline"} type="submit">Update Status</Button>



                        </form>
                    </Form>
                </DialogHeader>


            </DialogContent>
        </Dialog>
    )
}
