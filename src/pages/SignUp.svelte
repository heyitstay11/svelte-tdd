<script>
    import axios from 'axios'
    let disabled = true;
    let username, email, password, confirmPassword;

    const onSubmit = async () => {
        try {
            const { data } = await axios.post("/api/users", {
                username, email, password 
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    $: disabled = (password && confirmPassword) ? password !== confirmPassword : true;
</script>

<main>
    <h1>Sign Up</h1>

    <form on:submit|preventDefault={onSubmit}>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" bind:value={username}>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" bind:value={email}>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" bind:value={password}>
        <label for="confirm-password">Confirm Password</label>
        <input type="password" name="confirm-password" id="confirm-password" bind:value={confirmPassword}>
        <button {disabled} >Sign Up</button>
    </form>
</main>

