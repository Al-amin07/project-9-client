
export default function PriceTag({
    price,
    isPremium,
}: {
    price: number
    isPremium: boolean
}) {
    return <div className={`text-2xl font-bold ${isPremium ? "text-amber-500" : ""}`}>{price}</div>
}
