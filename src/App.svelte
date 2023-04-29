<script>
	import SignUp from "./pages/SignUp.svelte";
	import HomePage from "./pages/HomePage.svelte";
  	import LanguageSelector from "./components/LanguageSelector.svelte";
	import { _ } from "svelte-i18n";
	import { Router, Route, Link } from 'svelte-routing'
  	import UserPage from "./pages/UserPage.svelte";
  	import Activation from "./pages/Activation.svelte";
</script>

<div class="container">
	<Router url={window.location.path} >
		<div class="bg-light shadow-sm">
			<nav class="navbar navbar-expand container navbar-light">
				<ul class="navbar-nav ml-auto">
					<li class="nav-link"><Link to="/">Home</Link></li>
					<li class="nav-link"><Link to="/signup">{$_("signUp")}</Link></li>
				</ul>
			</nav>
		</div>
		<Route path="/" component={HomePage} />
		<Route path="/signup" component={SignUp} />
		<Route path="/user/:id" component={UserPage} />
		<Route path="/activate/:token" component={Activation} />
		<LanguageSelector />
	</Router>
	
</div>