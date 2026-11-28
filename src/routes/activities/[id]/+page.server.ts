import type { Actions, PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import * as db from '#lib/server/mongodb.server.ts';
import { form } from '$app/server';

export const load: PageLoad = async ({parent, params}) => {
    // const {userId} = await parent();
    const activity = await db.getActivity(params.id);
    if (activity == null) {
        error(404, 'Activity not found');
    }
    return {activity};
}

export const actions = {
    scheduled: async ({request}) => {
        const formData = await request.formData();
        const id = String(formData.get('id'));

        const res = await db.scheduleActivity(id);
        if (res == false) {
            error(400, 'Could not edit task');
        }
    }
} satisfies Actions;
