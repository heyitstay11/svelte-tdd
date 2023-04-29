<script>
    import axios from "axios";
    export let token;
    let success ;
    const activate = async (token) => {
        try {
            const { data } = await axios.post("/api/1.0/users/token/"+token)
            if(data){
                success = true
            }
        } catch (error) {
            
        }
    }
    activate(token);
</script>


<main data-test-id="activation-page">
    <h1>Account Activation</h1>
    {#if success}
        <div class="alert alert-success mt-3">Activeted</div>
    {/if}
</main>