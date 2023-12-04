import xlsx, { IJsonSheet, ISettings } from "json-as-xlsx";
import type { Order } from "./fetchAllOrders";

const transformToXLSXFormat = (content: Order[]): IJsonSheet => {
  return {
    columns: [
      { label: "Id", value: "id" },
      { label: "Nid", value: "nid" },
      { label: "Status", value: "status" },
      { label: "Nickname", value: "nickname" },
      { label: "Phone Number", value: "phone_number" },
      { label: "Pickup Time", value: "pickup_time" },
      { label: "Created At", value: "created_at" },
      { label: "Updated At", value: "updated_at" },
      { label: "Final Price", value: "final_price" },
    ],
    content,
  };
};

const settings: ISettings = {
  writeOptions: {
    type: "buffer",
    bookType: "xlsx",
  },
};

const generateCSVStream = async (orders: Order[]) =>
  xlsx([transformToXLSXFormat(orders)], settings) ||
  Promise.reject("An unexpected exception error occurred while producing XLSX");

export default generateCSVStream;
