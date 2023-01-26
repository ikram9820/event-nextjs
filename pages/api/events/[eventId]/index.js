import * as utils from "@/utils";

export default function handler(req, res) {
  if (req.method === "POST") {
    const []=req.body;
  } else if (req.method === "GET") {

  } else {
    res.status(405);
  }
}
