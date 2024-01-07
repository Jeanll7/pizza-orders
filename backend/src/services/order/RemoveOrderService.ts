import PrismaClient from "../../prisma";

interface OrderRquest {
  order_id: string;
}

class RemoveOrderService {
  async execute({ order_id }: OrderRquest) {

    const order = await PrismaClient.order.delete({
      where: {
        id: order_id,
      }
    })

    return order ;
  }
}

export { RemoveOrderService };
