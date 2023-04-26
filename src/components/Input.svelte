<script>
    export let label, id, value, help;
</script>

<div class="form-group">
    <label for={id}>{label}</label>
    <input class="form-control" type="text" id={id} name={id} bind:value >
    {#if help }
        <span role="alert">{help}</span>
    {/if}
</div>