import type { PageLoad } from './$types';
import * as db from '#lib/server/mongodb.server.ts';

export const load: PageLoad = async () => {
    const upcomingActivities = await db.getUpcomingActivities(4);
    const newActivities = await db.getNewActivities(4);

    return {upcomingActivities, newActivities};
}
