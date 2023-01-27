import { MongoClient } from "mongodb";

export async function getDbClient() {
  const client = await MongoClient.connect(
    "mongodb+srv://ikram:8KCXyzoXoNtnjmAe@nextjs-course.mopw532.mongodb.net/events-nextjs?retryWrites=true&w=majority"
  );
  return client;
}

export async function addDocument(db, collectionName, data) {
  const result = await db.collection(collectionName).insertOne(data);
  return result;
}

export async function getEventComments(db, eventId) {
  const eventComments = await db
    .collection("comments")
    .find({ eventId })
    .sort({ _id: -1 })
    .toArray();
  return eventComments;
}
