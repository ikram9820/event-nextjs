import { addDocument, connectDb } from "@/db-utils";

export default async function handler(req, res) {
  let client;
  if (req.method === "POST") {
    const email = req.body.email;
    try {
      client = await connectDb();
    } catch (error) {
      res.status(500).json({ message: "connecting database is failed" });
      return;
    }
    try {
      await addDocument(client, "emails", { email });
    } catch (error) {
      res.status(500).json({ message: "adding email is failed" });
      client.close();
      return;
    }

    res.status(201).json({ message: "subscribed successfully " });
  } else {
    res.status(405);
  }
  client.close();
}
