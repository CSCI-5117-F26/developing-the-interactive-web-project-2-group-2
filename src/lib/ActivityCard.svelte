<script lang='ts'>
    import {resolve} from '$app/paths';

    let props = $props();
    let activity = $derived(props.activity);
</script>

<div id='activityCard'>
    <div id='card'>
        <a href={resolve('/activities/[id]', {id: activity._id.$oid})}><h1>{activity.title}</h1></a>
        <h3>{activity.date.$date}</h3>
        {#if activity.image == null}
            <p>{activity.description}</p>
        {/if}
    </div>
</div>

<style>
    #activityCard {
        display: flex;
    }

    #card {
        background-color: lightgray;
        padding: 1em;
    }
</style>
