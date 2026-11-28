import * as db from '#lib/server/mongodb.server.js';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const actions = {
	create: async({request}) => {
		const formData = await request.formData();
		const title = String(formData.get('title') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();

		if (title == '' || !formData.get('date') || description == '') {
			return fail(400, 'Bad Input');
		}

		const date = new Date(formData.get('date'));
		const size = Number(formData.get('size'));
		// TODO: get image and lsit of participants

		const activity = {
			title: title,
			description: description,
			date: date,
			size: size,
			participants: [],
			image: null,
			scheduled: false,
			complete: false
		}
		await db.createActivity(activity);
		redirect(303, resolve('/activities'));
	} 
} satisfies Actions;
