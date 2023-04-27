<script>
  import { onMount } from "svelte";

    export let label, id, value = '', help, type="text";
    let inputRef = null;
    onMount(() => {
        inputRef.type = type;
    })
</script>

<div class="form-group">
    <label for={id}>{label}</label>
    <input bind:this={inputRef} class="form-control" class:is-invalid={help}  type="text" id={id} name={id} bind:value >
    {#if help }
        <span role="alert">{help}</span>
    {/if}
</div>