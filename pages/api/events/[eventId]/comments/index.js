import * as utils from "@/utils";
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  // const path = utils.getDataFilePath("comments");
  const client = await MongoClient.connect(
    "mongodb+srv://ikram:8KCXyzoXoNtnjmAe@nextjs-course.mopw532.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db("events-nextjs");

  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const name = req.body.name;
    const email = req.body.email;
    const text = req.body.text;
    const comment = { name, email, text, eventId };
    // let comments = utils.getAllComments(path);
    // if (comments.length === 0) {
    //   comments.push({
    //     eventId,
    //     comments: [comment],
    //   });
    // } else {
    //   let eventComments = comments.find(
    //     (eventComments) => eventComments.eventId === eventId
    //   );

    //   if (!eventComments || eventComments.length === 0) {
    //     comments.push({
    //       eventId,
    //       comments: [comment],
    //     });
    //   } else {
    //     eventComments.comments.push(comment);
    //   }
    // }

    // utils.addComment(path, comments);

    const result = await db.collection("comments").insertOne(comment);
    res
      .status(201)
      .json({
        message: "comment successfully added",
        commentId: result.insertedId,
      });
  } else if (req.method === "GET") {
    // const eventComments = utils.getEventComments(path, eventId);
    const eventComments = await db
      .collection("comments")
      .find({eventId})
      .sort({ _id: -1 })
      .toArray();

    console.log("2", eventComments);
    res.status(200).json({ comments: eventComments });
  } else {
    res.status(405);
  }
  client.close();
}
