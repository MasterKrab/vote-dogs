<script lang="ts">
	import { page } from '$app/stores'

	export let title: string | null = null
	export let description = 'Choose your favorites dogs and vote for them!'

	const PAGE_NAME = 'Vote Dogs 🐶'
</script>

<svelte:head>
	<title>{title ? `${title} | ${PAGE_NAME}` : PAGE_NAME}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.origin} />
	<meta property="og:title" content={title || PAGE_NAME} />
	<meta property="og:description" content={description} />
	<meta property="twitter:url" content={$page.url.origin} />
	<meta property="twitter:title" content={title || PAGE_NAME} />
	<meta name="twitter:description" content={description} />
</svelte:head>
