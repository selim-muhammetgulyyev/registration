import axios from "axios";
import { pick } from "lodash-es";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, status } = await axios.post(
      `https://api-s2.wella.professionalstore.com/rest/v2/wellaUS/users?lang=en`,
      req,
      {
        responseType: "stream",
        headers: pick(req.headers, ["authorization", "content-type"]),
      }
    );

    res.status(status);
    return res.send(data);
  } catch (error: any) {
    res.status(error?.response?.status ?? 400);
    return res.send(error?.response?.data ?? "{}");
  }
}
