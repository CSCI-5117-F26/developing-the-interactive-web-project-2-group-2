import * as db from '#lib/server/mongodb.server.ts';

export async function load() {
    return {activities: await db.getActivities()}
}
