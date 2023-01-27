import { addDocument, getDbClient } from "@/db-utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    const client = await getDbClient();
    const db = client.db();
    await addDocument(db, "emails", email);
    client.close();

    res.status(201).json({ message: "subscribed successfully " });
  } else {
    res.status(405);
  }
}
