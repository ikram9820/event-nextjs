import { getDbClient, addDocument, getEventComments } from "@/db-utils";

export default async function handler(req, res) {
  const client = await getDbClient();
  const db = client.db();

  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const name = req.body.name;
    const email = req.body.email;
    const text = req.body.text;
    const comment = { name, email, text, eventId };

    const result = await addDocument(db, "comments", comment);

    res.status(201).json({
      message: "comment successfully added",
      commentId: result.insertedId,
    });

  } else if (req.method === "GET") {

    const eventComments = await getEventComments(db, eventId);
    res.status(200).json({ comments: eventComments });

  } else {
    res.status(405);
  }
  client.close();
}
