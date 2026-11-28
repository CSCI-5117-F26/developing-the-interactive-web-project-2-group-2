<script lang='ts'>
    import ActivityCard from '#lib/ActivityCard.svelte';
    import FriendCard from '#lib/FriendCard.svelte';
    import { goto } from '$app/navigation';
    import {resolve} from '$app/paths';

    let {data} = $props();
    let {upcomingActivities, newActivities} = $derived(data);
</script>

<div id='dashboard'>
    <div>
        <div id='friends'>
            <a href={resolve('/friends')}><h1>Your Friends</h1></a>
            <FriendCard/>
        </div>
        <button onclick={()=>{goto(resolve('/activities/new'))}}>Create New Event</button>
    </div>
    <div id='activities'>
        <div id='upcoming'>
            <a href={resolve('/activities/upcoming')}><h1>Upcoming Activities</h1></a>
            {#if upcomingActivities.length != 0}
                {#each upcomingActivities as activity}
                    <ActivityCard activity={activity}/>
                {/each}
            {:else}
                <p>No upcoming scheduled activities</p>
            {/if}
        </div>
        <div id='new'>
            <a href={resolve('/activities')}><h1>New Activities</h1></a>
            {#if newActivities.length != 0}
                <div id='activityCards'>
                    {#each newActivities as activity}
                        <ActivityCard activity={activity}/>
                    {/each}
                </div>
            {:else}
                <p>No new activities</p>
            {/if}
        </div>
    </div>
</div>

<style>
    #activityCards {
        display: flex;
        gap: 1em;
    }
</style>
