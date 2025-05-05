import Rating from "@/components/module/dashboard/shared/rating";
import { getRating } from "@/services/posts"





export default async function ratingpage(){
    const data = await getRating();
  return (
    <div>
      <Rating data={data?.data} />
    </div>
  )
}


