import PrismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class SendOrderService {
  async execute({ order_id }: OrderRequest) {

    const existingOrder = await PrismaClient.order.findUnique({
      where: {
        id: order_id,
      },
    });
    
    if (!existingOrder) {
      // Tratar o caso em que o pedido não foi encontrado
      throw new Error(`Pedido com id ${order_id} não encontrado.`);
    }
        
    // Continuar com a atualização
    const order = await PrismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        draft: false,
      }
    });

    return order;
  }
}

export { SendOrderService } 