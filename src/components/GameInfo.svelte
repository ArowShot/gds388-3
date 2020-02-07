<script>
    import { notifier } from '@beyonk/svelte-notifications/src/index.js'
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte'
    import FaTrashAlt from 'svelte-icons/fa/FaTrashAlt.svelte'
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    async function deleteGame() {
		loading = true;
		
		let res = await fetch(`/game/${_id}.json`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		loading = false
		if(res.ok) {
            notifier.danger(`Deleted ${title}`)
            dispatch('delete', {_id});
		} else {
			notifier.danger(`Failed to delete`)
		}
    }

    let loading = false;

    export let _id;
    export let title;
    export let genre;
    export let description;
</script>

<style>
    .icon {
        width: 1.25rem;
        height: 1.25rem;
        display: inline-block;
        vertical-align: text-top;
    }

	#overlay{
		position: absolute;
		top:0px;
		left:0px;
		width: 100%;
		height: 100%;
		background: white;
		opacity: .5;
	}
</style>

<div class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">
            {title}
            <a rel=prefetch href={`/game/${_id}`} class="icon">
                <FaExternalLinkAlt/>
            </a>
            <a on:click={deleteGame} href="#" class="icon">
                <FaTrashAlt/>
            </a>
        </h5>
        <small>Added 1 minute ago</small>
    </div>
    <p class="mb-1">{description}</p>
    <small>{genre}</small>
	{#if loading}
	<div id="overlay" class="d-flex justify-content-center align-items-center">
		<div class="spinner-border" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	</div>
	{/if}
</div>