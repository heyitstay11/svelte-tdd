<script>
  import axios from "axios";
    import { locale } from "svelte-i18n";
    const onLanguageChange = (language) => {
        locale.set(language)
        axios.defaults.headers["Accept-Language"] = language;
    }
</script>

<div>
    <button title="Turkish" on:click={() => onLanguageChange("tr")}>TR</button>
    <button title="English" on:click={() => onLanguageChange("en")}>EN</button>
</div>