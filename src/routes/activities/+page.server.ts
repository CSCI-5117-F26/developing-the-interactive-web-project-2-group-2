import * as db from '#lib/server/mongodb.server.ts';

export async function load({request, url}) {
    const filter = url.searchParams.get('filter');

    let activities = await db.getActivities();
    if (filter == 'upcoming') {
        activities = await db.getUpcomingActivities();
    } else if (filter == 'new') {
        activities = await db.getNewActivities();
    }

    return {activities: activities}
}
