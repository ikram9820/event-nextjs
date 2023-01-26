import * as utils from "@/utils";

export default function handler(req, res) {
  const path = utils.getDataFilePath("comments");
  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const name = req.body.name;
    const email = req.body.email;
    const text = req.body.text;
    let comments = utils.getAllComments(path);
    const comment = { id: new Date().toISOString(), name, email, text };
    if (comments.length === 0) {
      comments.push({
        eventId,
        comments: [comment],
      });
    } else {
      let eventComments = comments.find(
        (eventComments) => eventComments.eventId === eventId
      );

      if (!eventComments || eventComments.length === 0) {
        comments.push({
          eventId,
          comments: [comment],
        });
      } else {
        eventComments.comments.push(comment);
      }
    }

    utils.addComment(path, comments);
    res.status(201).json({ message: "comment successfully added", comment });
  } else if (req.method === "GET") {
    const eventComments = utils.getEventComments(path, eventId);

    console.log("2", eventComments);
    res.status(200).json({ comments: eventComments });
  } else {
    res.status(405);
  }
}
