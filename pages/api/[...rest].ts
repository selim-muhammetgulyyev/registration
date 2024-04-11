import axios, { Method } from "axios";
import { omit, pick } from "lodash-es";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryParams = omit(req.query, "rest");
  const url = ((req.query.rest as string[] | undefined) ?? []).join("/");

  try {
    const apiResponse = await axios({
      baseURL: "https://api-s2.wella.professionalstore.com",
      url: url,
      params: queryParams,
      method: (req.method as Method) ?? "GET",
      headers: pick(req.headers, ["authorization", "accept", "content-type"]),
      data: req.body,
      responseType: "arraybuffer",
    });

    const resBody = await apiResponse.data;
    res.status(apiResponse.status);
    return res.send(resBody);
  } catch (error: any) {
    res.status(error?.response?.status ?? 400);
    return res.send(error?.response?.data ?? "{}");
  }
}
