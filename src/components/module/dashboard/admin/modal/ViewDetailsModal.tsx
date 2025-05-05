import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IUser } from "@/types";
import { Badge } from "@/components/ui/badge";

export function ViewDetailsModal({ user }: { user: IUser }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="text-sm text-blue-600 hover:underline cursor-pointer px-2.5 py-1.5">
                    View Details
                </span>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-xl shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-primary">👤 User Profile</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Detailed stats and info about this user.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 pb-5 pt-2">
                    <div className=" p-4 rounded-lg grid grid-cols-3 gap-2">
                        <p className="text-sm text-muted-foreground col-span-1 font-medium">Name</p>
                        <p className="col-span-2 text-base font-semibold text-primary">{user?.fullName || "John Doe"}</p>

                        <p className="text-sm text-muted-foreground col-span-1 font-medium">Email</p>
                        <p className="col-span-2 text-base text-primary">{user?.email}</p>

                        <p className="text-sm text-muted-foreground col-span-1 font-medium">Status</p>
                        <div className="col-span-2">
                            <Badge
                                variant="outline"
                                className={`capitalize ${user?.status === "ACTIVE"
                                    ? "bg-green-100 text-green-700"
                                    : user?.status === "BLOCKED"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                            >
                                {user?.status}
                            </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground col-span-1 font-medium">Premium</p>
                        <div className="col-span-2">
                            <Badge
                                className={`${user?.isPremium ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}
                            >
                                {user?.isPremium ? "Premium User" : "Free User"}
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                        <StatBox label="Comments" value={user?.comments.length ?? 0} color="blue" />
                        <StatBox label="Posts" value={user?.posts.length ?? 0} color="blue" />
                        <StatBox label="Votes" value={user?.votes.length ?? 0} color="blue" />
                        <StatBox label="Ratings" value={user?.ratings.length ?? 0} color="blue" />
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}

function StatBox({
    label,
    value,
    color,
}: {
    label: string;
    value: number;
    color: string;
}) {
    return (
        <div className={`bg-${color}-100 text-${color}-800 p-4 rounded-lg`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm font-medium">{label}</div>
        </div>
    );
}
