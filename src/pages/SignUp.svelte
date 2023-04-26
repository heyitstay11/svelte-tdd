<script>
    import axios from 'axios'
    import Input from '../components/Input.svelte';
    let disabled = true;
    let username, email, password, confirmPassword;
    let isLoading;
    let success;
    let errors = {}

    const onSubmit = async () => {
        disabled = true;
        isLoading = true
        try {
            const { data, status } = await axios.post("/api/1.0/users", {
                username, email, password 
            });
            if(status == 200) success = true;
        } catch (error) {
            if(error.response.status === 400){
                errors = error.response.data.validationErrors;
            }
        }
    }
    
    $: disabled = (password && confirmPassword) ? password !== confirmPassword : true;
</script>

<main class="container col-lg-6">

    <form class="card mt-5" on:submit|preventDefault={onSubmit}>
        <div class="card-header">
            <h1 class="text-center">Sign Up</h1>
        </div>
        <div class="card-body">
            <Input value={username} />
            <div class="form-group">
                <label for="email">Email</label>
                <input class="form-control" type="email" id="email" name="email" bind:value={email}>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input class="form-control" type="password" name="password" id="password" bind:value={password}>
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input class="form-control" type="password" name="confirm-password" id="confirm-password" bind:value={confirmPassword}>
            </div>
            <div class="text-center">
                <button class="btn btn-primary" {disabled} >
                    {#if isLoading}
                    <span role="status" class="spinner-border spinner-border-sm"></span>
                    {/if}
                Sign Up</button>
            </div>
        </div>
    </form>
    {#if success}
        <div class="alert alert-success">Check account for activation id</div>
    {/if}
</main>

