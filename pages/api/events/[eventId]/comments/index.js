import { connectDb, addDocument, getEventComments } from "@/db-utils";

export default async function handler(req, res) {
  let client;
  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "connecting database is failed" });
    return;
  }

  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const name = req.body.name;
    const email = req.body.email;
    const text = req.body.text;
    let comment = { name, email, text, eventId };

    try {
      const result = await addDocument(client, "comments", comment);
      comment = { _id: result.insertedId, ...comment };
      res.status(201).json({
        message: "comment successfully added",
        comment,
      });
    } catch (error) {
      res.status(500).json({ message: "adding comment is failed" });
      client.close();
      return;
    }
  } else if (req.method === "GET") {
    const eventComments = await getEventComments(client, eventId);
    res.status(200).json({ comments: eventComments });
  } else {
    res.status(405);
  }
  client.close();
}
