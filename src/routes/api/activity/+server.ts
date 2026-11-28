import * as db from '#lib/server/mongodb.server.ts';
import { error } from '@sveltejs/kit';

export async function DELETE({request}) {
    const {id} = await request.json();
    const res = await db.deleteActivity(id);

    if (!res) {
        error(400, 'Failed to delete');
    }

    return Response.json({success: res});
}
