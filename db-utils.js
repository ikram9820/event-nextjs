import { MongoClient } from "mongodb";

export async function connectDb() {
  const client = await MongoClient.connect(
    "mongodb+srv://ikram:8KCXyzoXoNtnjmAe@nextjs-course.mopw532.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
}

export async function addDocument(client, collectionName, data) {
  const db = client.db("events-nextjs");

  const result = await db.collection(collectionName).insertOne(data);
  return result;
}

export async function getEventComments(client, eventId) {
  const db = client.db("events-nextjs");

  const eventComments = await db
    .collection("comments")
    .find({ eventId })
    .sort({ _id: -1 })
    .toArray();
  return eventComments;
}
