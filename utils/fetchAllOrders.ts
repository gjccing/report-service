import { Params } from "./parseParams";

export type Order = {
  created_at: string;
  final_price: string;
  id: number;
  nickname: string;
  nid: string;
  phone_number: string;
  pickup_time: string;
  resolved_at: string;
  status: string;
  updated_at: string;
};

export type APIResponseBody = {
  data: Order[];
  meta: {
    total_pages: number;
    total_count: number;
    total_price: number;
  };
};

const fetchAllOrders = async (params: Params): Promise<Order[]> => {
  let result: Order[] = [];
  let page = 0;
  let totalPages;
  do {
    const response = await fetch(
      `${process.env.GGV_API_URL}/api/w1/b2b/order_requests/index?` +
        new URLSearchParams({
          start_date: params.start_date,
          end_date: params.end_date,
          sort: params.sort,
          page: (page += 1).toString(),
        }).toString(),
      {
        headers: {
          "gogovan-user-auth-version": "2",
          Authorization: `Basic ${params.user_auth_token}`,
        },
      }
    );
    const { data: orders, meta } = (await response.json()) as APIResponseBody;
    totalPages = meta.total_pages;
    result.push(...orders);
  } while (page < totalPages);
  return result;
};

export default fetchAllOrders;
