import Stripe from "stripe";
import { prisma } from "@/util/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Get the user
      const user = await getServerSession(req, res, authOptions);
      if (!user) {
        res.status(403).json({ message: "Not logged in" });
      }

      // Find all orders for this user
      const orders = await prisma.order.findMany({
        where: {
          userId: user?.user?.id,
          status: "complete",
        },

        include: {
          products: true,
        },
        orderBy: {
          createdDate: "desc",
        },
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method not allowed");
  }
}
