<script lang='ts'>
  import { enhance } from "$app/forms";
</script>

<!-- Creates new activity, DOES NOT schedule it! -->
<div id='newActivity'>
    <form method='post' action='?/create' enctype="multipart/form-data" use:enhance>
        <label>Title <input type="text" name='title' required></label>
        <label>Date <input type="date" name='date' required></label>
        <label>Number of participants <input type="number" name='size' min=1 required></label>
        <label>Participants <input type='text' name='participants'></label>
        <label>Description <textarea name='description' required></textarea></label>
        <label>Image <input type="file" name='image'/></label>
        <button>Create</button>
    </form>
</div>
