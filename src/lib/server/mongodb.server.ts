import { BSON, MongoClient, ObjectId } from 'mongodb';
import { attachDatabasePool } from "@vercel/functions";
import { MONGODB_URI } from '$app/env/private';
export const EJSON = BSON.EJSON; 

export const client = new MongoClient(MONGODB_URI);
attachDatabasePool(client);

export const database = client.db('project2');  // we can change later
const activities = database.collection('activities');
const profiles = database.collection('profiles');

type FriendPreview = {
    id: ObjectId,
    name: string,
}

export type Profile = {
    name: string,
    username: string,
    friends: ObjectId[],
    bio: string,
    interests: string[]
    image: File | null,     // profile picture I don't know what type yet
    accountId: ObjectId     // unqiue id of user account 
}

export type Activity = {
    title: string,
    description: string,
    date: Date,
    size: number,
    participants: FriendPreview[],
    image: File | null,
    scheduled: boolean,
    complete: boolean
}

export async function getActivities() {
    const activityList = await activities.find().toArray();
    return EJSON.serialize(activityList);
}

export async function getActivity(id: string) {
    if (!ObjectId.isValid(id)) return null;

    const activity = await activities.findOne({_id: new ObjectId(id)});
    return activity ? EJSON.serialize(activity) : null;
}

export async function getUpcomingActivities(limit=0) {
    const upcomingActivities = await activities.find({scheduled: true, complete: false}).limit(limit).toArray();        // TODO: include ones user is in
    return EJSON.serialize(upcomingActivities);
}

export async function getNewActivities(limit=0) {
    const upcomingActivities = await activities.find({scheduled: false}).limit(limit).toArray();        // TODO: only show user is not in
    return EJSON.serialize(upcomingActivities);
}

export async function createActivity(activity: Activity) {
    await activities.insertOne(activity);
}

export async function deleteActivity(id: string) {
    const res = await activities.deleteOne({_id: new ObjectId(id)});
    return res.deletedCount == 1;
}

export async function scheduleActivity(id: string) {
    const res = await activities.updateOne({_id: new ObjectId(id)}, {$set: {scheduled: true}});
    return res.modifiedCount == 1 && res.matchedCount == 1;
}

export async function getProfile(id: string) {
    if (!ObjectId.isValid(id)) return null;

    const user = await profiles.findOne({_id: new ObjectId(id)});
    return user ? EJSON.serialize(user) : null;
}
