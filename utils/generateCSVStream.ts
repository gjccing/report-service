import { AsyncParser } from "@json2csv/node";
import type { Order } from "./fetchAllOrders";

const json2csvParser = new AsyncParser({
  fields: [
    "id",
    "nid",
    "status",
    "nickname",
    "phone_number",
    "pickup_time",
    "created_at",
    "updated_at",
    "final_price",
  ],
});

const generateCSVStream = (orders: Order[]) => json2csvParser.parse(orders);
export default generateCSVStream;
