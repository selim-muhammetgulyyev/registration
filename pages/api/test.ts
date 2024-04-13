import axios from "axios";
import console from "console";
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
  const url = ((req.query.rest as string[] | undefined) ?? []).join("/");
  console.log("here");
  try {
    const { data, status } = await axios.post(
      `http://localhost:3000/library-resources`,
      req,
      {
        responseType: "stream",
        headers: pick(req.headers, ["authorization", "content-type"]),
      }
    );

    res.status(status);
    return res.send(data);
  } catch (error: any) {
    console.log({ error });
    res.status(error?.response?.status ?? 400);
    return res.send(error?.response?.data ?? "{}");
  }
}
