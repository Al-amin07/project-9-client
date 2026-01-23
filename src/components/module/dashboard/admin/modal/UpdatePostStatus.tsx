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
import { Textarea } from "@/components/ui/textarea";
import { IPost } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
    status: z.enum(["PENDING", "APPROVED", "REJECTED"], {
        required_error: "Please select a status.",
    }),
    reasons: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
export function PostUpdateModal({ post, onSubmit }: { post: IPost, onSubmit: (id: string, status: FormValues) => Promise<void> }) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: post?.status,
            reasons: post?.reasons || ""
        },
    });
    const { formState: { isSubmitting } } = form
    const handleSubmit = (data: FormValues) => {
        onSubmit(post?.id, data);
    };
    console.log({ isSubmitting })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="border-0 text-sm cursor-pointer hover:bg-secondary px-2.5 py-1.5 ">Update Status</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-3">Update Post status</DialogTitle>

                    <Form {...form} >
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

                                                    value="APPROVED">Approved</SelectItem>
                                                <SelectItem value="REJECTED">Rejected</SelectItem>
                                                <SelectItem value="PENDING">Pending</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="reasons"

                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Reasons</FormLabel>
                                        <FormControl>

                                            <Textarea

                                                rows={4}
                                                placeholder="Tell us a little bit about yourself"
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button variant={"outline"} type="submit">{isSubmitting ? "Updating..." : " Update Status"}

                            </Button>



                        </form>
                    </Form>
                </DialogHeader>


            </DialogContent>
        </Dialog>
    )
}
