import { useGetMyOrders } from "@/api/OrderApi"
import Loading from "@/components/Loading"
import OrderStatusDetail from "@/components/OrderStatusDetail"
import OrderStatusHeader from "@/components/OrderStatusHeader"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Link } from "react-router-dom"

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders()
  if (isLoading) {
    return <Loading />
  }
  if (!orders || orders.length === 0) {
    return (
      <span className="font-bold text-xl md:text-2xl flex items-center justify-center h-full">
        Seems like you have not done any order yet.{" "}
        <Link to="/" className="text-blue-500 underline">
          Order now
        </Link>
      </span>
    )
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div key={order._id} className="space-y-10 bg-gray-50 px-0 md:p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 9}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
                loading="lazy"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderStatusPage
