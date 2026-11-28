<script lang='ts'>
    import ActivityCard from "#lib/ActivityCard.svelte";
    import { goto } from '$app/navigation';
    import {resolve} from '$app/paths';

    let {data} = $props();
    let {activities} = $derived(data);

    let search = $state('');
    async function searchActivity() {

    }
</script>

<div id='activities'>
    <div id='buttons'>
        <button onclick={()=>{goto(resolve('/activities/new'))}}>Add</button>
        <div id='search'>
            <input type='text' name='search' placeholder="search" bind:value={search}>
            <button onclick={()=>{searchActivity()}}>Search</button>
        </div>
    </div>

    <div id='activitiesList'>
        {#each activities as activity}
        <ActivityCard activity={activity}/>
        {/each}
    </div>
</div>
