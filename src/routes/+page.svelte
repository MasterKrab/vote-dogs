<script lang="ts">
	import type { VotedDog } from '$lib/types/dog'
	import type Breed from '$lib/types/breed'

	import Metadata from '$lib/components/Metadata.svelte'
	import Dogs from '$lib/components/Dogs.svelte'

	export let data: {
		dogs: VotedDog[]
		totalAmountOfDogs: number
		breeds: Breed[]
	}

	let { dogs, totalAmountOfDogs, breeds } = data
</script>

<Metadata />

<main class="max-w-7xl w-full mx-auto text-center p-5">
	<h1 class="text-teal-500 text-5xl sm:text-9xl font-bold my-10 leading-20">Vote Dogs 🐶</h1>

	<p class="font-semibold text-xl">Choose your favorites dogs and vote for them!</p>
	<p class="font-semibold text-xl">
		There are <span class="text-teal-500">{totalAmountOfDogs}</span> dogs and
		<span class="text-teal-500">{breeds.length}</span> breeds!.
	</p>

	<a
		href="/play"
		class="block w-max mx-auto bg-teal-500 py-2 px-10 text-2xl mt-10 mb-16 text-white font-bold rounded"
	>
		Get started!
	</a>

	<Dogs {dogs} {breeds} />
</main>
