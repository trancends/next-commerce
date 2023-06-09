import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { prisma } from "@/util/prisma";

const fetchOrders = async () => {
  const user = await getServerSession(authOptions);

  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
      status: "complete"
    },
    include: {
      products: true,
    },
    orderBy: {
      createdDate: "desc",
    },
  });

  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  if (orders === null)
    return <div>You need to be logged in to view your orders</div>;
  if (orders.length === 0) {
    return (
      <div>
        <h1>No orders placed</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Your Orders: </h1>
      <div className="font-medium">
        {orders.map((order) => (
          <div key={order.id} className="my-4 rounded-lg bg-base-200 p-8">
            <h2>Order reference: {order.id}</h2>
            <p>
              Time: {new Date(order.createdDate).toLocaleDateString()} -{" "}
              {new Date(order.createdDate).toLocaleTimeString()}
            </p>
            <p className="text-md py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } mx-2 rounded-md px-2 py-1 text-sm text-white`}
              >
                {order.status}
              </span>
            </p>
            <p className="font-medium">Total: {formatPrice(order.amount)}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {order.products.map((product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">Product: {product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image!}
                      width={32}
                      height={32}
                      alt={product.name}
                      priority={true}
                      className=" w-auto"
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
