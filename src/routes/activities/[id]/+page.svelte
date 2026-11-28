<script lang='ts'>
    import FriendCard from '#lib/FriendCard.svelte';
    import { enhance } from '$app/forms';
    import { goto, refreshAll } from '$app/navigation';
    import {resolve} from '$app/paths';

    let {data} = $props();
    let {activity} = $derived(data);

    async function deleteActivity() {
        const url = '/api/activity';
        const res = await fetch(url, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: activity._id.$oid})
        });

        if (res.ok) {
            await refreshAll();
            goto(resolve('/activities'));
        }
    }
</script>

<div id='activityPage'>
    <div id='topRowButtons'>
        <button onclick={()=>{goto(resolve('/activities'))}}>All Activities</button>
        <div id='editDeleteButton'>
            <button>Edit</button>
            <button onclick={deleteActivity}>Delete</button>
        </div>
    </div>
    <div id='activityInfo'>
        <div>
            <p>Image here</p>   
            <!-- TODO: add image here -->
            {#if activity.scheduled == false}
                <form method='POST' action='?/scheduled' use:enhance>
                    <input type="hidden" name='id' value={activity._id.$oid}>
                    <button>Schedule!</button>
                </form>
            {/if}
        </div>
        <div id='details'>
            <h1>{activity.title}</h1>
            <div id='friendsList'>
                {#if activity.participants.length != 0}
                    {#each activity.participants as participant}
                        <FriendCard />
                    {/each}
                {:else}
                    <p>No current participants</p>
                {/if}
            </div>
            <div id='details'>
                <!-- TODO: CSS change to pill buttons -->
                <p>{activity.date.$date}</p>
                <p>{activity.size}</p>
            </div>
            <p>{activity.description}</p>
        </div>
    </div>
</div>

<style>
    #activityPage {
        display: flex;
        flex-direction: column;
    }

    #activityInfo {
        display: flex;
        gap: 1em;
        justify-content: center;
        flex-wrap: wrap;
    }

    #topRowButtons {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    #editDeleteButton {
        display: flex;
        justify-content: flex-end;
        gap: 1em;
        flex-wrap: wrap;
    }
</style>
