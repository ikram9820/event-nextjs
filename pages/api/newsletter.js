import * as utils from "@/utils";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    // const path = utils.getDataFilePath("emails");
    // let emails = utils.getAllEmails(path);
    // emails.push({email});
    // utils.addNewsletterEmail(path, emails);

    const client = await MongoClient.connect(
      "mongodb+srv://ikram:8KCXyzoXoNtnjmAe@nextjs-course.mopw532.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db("nextjs-course");
    await db.collection("emails").insertOne({ email });
    client.close();
    res.status(201).json({ message: "subscribed successfully " });
  } else {
    res.status(405);
  }
}
