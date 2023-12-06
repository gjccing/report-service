import { z, ZodError } from "zod";

export type Params = {
  user_auth_token: string;
  start_date: string;
  end_date: string;
  sort: "order_requests.pickup_time" | "-order_requests.pickup_time";
};

const ParamsParser = z.object({
  user_auth_token: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  sort: z.enum(["order_requests.pickup_time", "-order_requests.pickup_time"]),
});

const parseParams = (query: { [key: PropertyKey]: any }): Params => {
  ParamsParser.parse(query);
  return {
    user_auth_token: query.user_auth_token,
    start_date: query.start_date,
    end_date: query.end_date,
    sort: query.sort,
  };
};

export default parseParams;
