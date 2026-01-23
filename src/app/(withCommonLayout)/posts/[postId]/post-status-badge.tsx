import { Badge } from "@/components/ui/badge";
import { PostStatus } from "@/types";

interface Props {
    status: PostStatus
  }
  
  export const PostStatusBadge = ({ status }: Props) => {
    const statusMap: Record<PostStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
      APPROVED: { label: "Approved", variant: "default" },
      PENDING: { label: "Pending", variant: "secondary" },
      REJECTED: { label: "Rejected", variant: "destructive" },
    }
  
    const current = statusMap[status]
  
    if (!current) return null 
  
    return <Badge variant={current.variant}>{current.label}</Badge>
  }
  