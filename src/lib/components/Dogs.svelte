<script lang="ts">
	import type { VotedDog } from '$lib/types/dog'
	import type Breed from '$lib/types/breed'

	import { fly } from 'svelte/transition'

	import Loader from '$lib/components/Loader.svelte'

	import observeIntersect from '$lib/actions/observeIntersect'
	import masonry from '$lib/actions/masonry'
	import getDogs from '$lib/api/getDogs'
	import { TIMES, TIMES_TEXTS } from '$lib/constants/times'

	export let dogs: VotedDog[] = []
	export let breeds: Breed[] = []

	let loading = false

	let time = TIMES.ALL_TIME
	let breedId = ''

	const loadMoreDogs = async () => {
		if (loading) return

		loading = true
		const newDogs = await getDogs({ take: 30, skip: dogs.length, time, breedId })
		loading = false
		dogs = [...dogs, ...newDogs]
	}

	const handleChange = async () => {
		dogs = []
		loading = true
		dogs = await getDogs({ take: 30, skip: 0, time, breedId })
		loading = false
	}
</script>

<article>
	<div class="flex flex-col md:flex-row justify-center md:justify-between gap-5">
		<h2 class="font-semibold text-3xl sm:text-4xl">Most voted Dogs</h2>

		<div class="flex gap-5 justify-center">
			<select class="select-home" bind:value={time} on:change={handleChange} aria-label="Time">
				{#each Object.values(TIMES) as value}
					<option {value}>{TIMES_TEXTS[value]}</option>
				{/each}
			</select>

			<select class="select-home" bind:value={breedId} on:change={handleChange} aria-label="Breed">
				<option value="">All breeds</option>
				{#each breeds as { id, name }}
					<option class="capitalize" value={id}>{name}</option>
				{/each}
			</select>
		</div>
	</div>

	<article
		class="grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-2 justify-items-center p-5 md:p-10"
		aria-label="Dogs"
		use:masonry
	>
		{#each dogs as { image, breed, votes }, index}
			<article
				class="relative rounded overflow-hidden font-bold font-xl w-full h-fit"
				in:fly={{ duration: 500, y: 20 }}
				out:fly={{ duration: 500, y: -20 }}
			>
				<img class="block w-full" src={image} loading={index > 5 ? 'lazy' : 'eager'} alt="" />
				<div
					class="flex justify-end items-center gap-2 absolute bottom-0 pb-2 px-5 bg-black/[.4] w-full text-white capitalize shadow-[0_0_15px_15px_rgba(0,0,0,0.4)]"
				>
					<p class="mr-auto">{breed.name}</p>
					<a class="grid place-content-center" href="/api/image?url={image}" download={breed.name}>
						<img
							class="block w-6 invert"
							src="/assets/download.svg"
							alt="Download image of a {breed.name}"
						/>
					</a>
					<h3 class="flex gap-2">
						{votes}
						<img class="w-6" src="/assets/prize.svg" alt="" />
					</h3>
				</div>
			</article>
		{/each}
	</article>

	<div
		use:observeIntersect={{ rootMargin: '1500px', threshold: 0.5 }}
		on:intersect={loadMoreDogs}
	/>

	{#if loading}
		<div class="py-52">
			<Loader />
		</div>
	{/if}
</article>
