<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
  	import { resolve } from '$app/paths';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id='header'>
	<a href={resolve('/dashboard')}>Dashboard</a>
	<a href={resolve('/friends')}>Friends</a>
	<a href={resolve('/profile')}>Profile</a>
	<!-- <a href={resolve('/signin')}>Login/Sign Out</a> -->
</div>

{@render children()}
