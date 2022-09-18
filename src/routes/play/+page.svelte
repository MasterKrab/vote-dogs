<script lang="ts">
	import type { Dog } from '$lib/types/dog'

	import { fly, scale } from 'svelte/transition'

	import Metadata from '$lib/components/Metadata.svelte'
	import Loader from '$lib/components/Loader.svelte'

	import getRandomDogs from '$lib/api/getRandomDogs'
	import loadImage from '$lib/utils/loadImage'
	import voteDog from '$lib/api/voteDog'

	const getDogs = async () => {
		const dogs = await getRandomDogs(2)
		await Promise.all(dogs.map((dog) => loadImage(dog.image)))
		return dogs
	}

	let votedDogs: Dog[] = []

	const createVoteDog = (dog: Dog) => () => {
		votedDogs = [...votedDogs, dog]
		voteDog(dog.id)
	}

	let ready = true

	let innerWidth: number
</script>

<Metadata title="Play" />

<svelte:window bind:innerWidth />

<header class="p-5">
	<nav>
		<a href="/" class="bg-teal-500 py-2 px-7 text-white font-bold rounded">Go to Home</a>
	</nav>
</header>

{#key votedDogs.length}
	{#if ready}
		{#await getDogs()}
			<div class="flex items-center m-auto">
				<Loader />
			</div>
		{:then dogs}
			<section
				class="text-center m-auto"
				in:fly={{ duration: 200, y: 20 }}
				out:fly={{ duration: 200, y: -20 }}
				on:outrostart={() => (ready = false)}
				on:outroend={() => (ready = true)}
			>
				<h1 class="text-5xl mb-10">Choose your favorite</h1>

				<div class="flex flex-wrap justify-items-center justify-center gap-10 p-2">
					{#each dogs as dog}
						<button class="rounded overflow-hidden relative" on:click={createVoteDog(dog)}>
							<img src={dog.image} alt="" class="w-80 h-80 block object-cover object-center" />

							<p class="absolute bottom-0 p-2 bg-black/50 w-full text-white capitalize">
								{dog.breed.name}
							</p>
						</button>
					{/each}
				</div>
			</section>
		{/await}
	{/if}
{/key}

<section class="flex mt-auto px-[20px] py-3 w-full justify-center h-[100px] bg-teal-100/50">
	{#each votedDogs.slice(-Math.floor((innerWidth - 40) / 100)) as { image }}
		<img
			class="w-[80px] h-[80px] mx-[10px] rounded-[50%] block object-cover object-center"
			src={image}
			alt=""
			transition:scale
		/>
	{/each}
</section>
