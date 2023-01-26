import * as utils from "@/utils";

export default function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const path = utils.getDataFilePath("emails");
    let emails = utils.getAllEmails(path);
    emails.push({email});
    utils.addNewsletterEmail(path, emails);
    res.status(201).json({ message: "subscribed successfully " });
  } else {
    res.status(405);
  }
}
