<script lang="ts">
	export let src: string
	export let alt: string
	export let className: string

	let loaded = false
</script>

<img {src} {alt} class={className} on:load={() => (loaded = true)} class:loading={!loaded} />

<style>
	.loading {
		background-color: #eee;
		filter: blur(20px);
	}
</style>
