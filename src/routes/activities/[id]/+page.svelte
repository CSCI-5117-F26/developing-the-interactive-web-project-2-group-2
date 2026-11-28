<script lang='ts'>
    import FriendCard from '#lib/FriendCard.svelte';
    import { enhance } from '$app/forms';

    let {data} = $props();
    let {activity} = $derived(data);

    console.log(activity);
</script>

<div id='activityPage'>
    <div>
        <div id='image'>
            <!-- TODO: image here -->
        </div>
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
