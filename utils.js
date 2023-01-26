import fs from "fs";
import path from "path";

export function getDataFilePath(dataFileName) {
  const dataPath = path.join(process.cwd(), "data", dataFileName + ".json");
  return dataPath;
}

export function getAllEvents(path) {
  let events = fs.readFileSync(path);
  events = JSON.parse(events);
  return events;
}

export function getEvent(path, eventId) {
  let events = fs.readFileSync(path);
  events = JSON.parse(events);
  const event = events.find((event) => event.id === eventId);
  return event;
}

export function getAllComments(path) {
  let comments = fs.readFileSync(path);
  comments = JSON.parse(comments);
  return comments;
}

export function getEventComments(path, eventId) {
  let comments = getAllComments(path);
  let eventComments = comments.find(
    (eventComments) => eventComments.eventId === eventId
  );
  console.log(eventComments);
  return eventComments.comments;
}

export function getComment(path, eventId, commentId) {
  let comments = getEventComments(path, eventId);
  const comment = comments.find((comment) => comment.id === commentId);
  return comment;
}

export function addComment(path, comment) {
  fs.writeFileSync(path, JSON.stringify(comment));
}

export function getAllEmails(path) {
  let emails = fs.readFileSync(path);
  emails = JSON.parse(emails);
  return emails;
}

export function addNewsletterEmail(path, emails) {
  fs.writeFileSync(path, JSON.stringify(emails));
}
