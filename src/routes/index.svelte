<style>
	#overlay{
		position: absolute;
		top:0px;
		left:0px;
		width: 100%;
		height: 100%;
		background: white;
		opacity: .5;
	}

    .icon {
        width: 1.25rem;
        height: 1.25rem;
        display: inline-block;
        vertical-align: text-top;
    }
</style>

<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`games`).then(r => r.json()).then(games => {
			return { games };
		});
	}
</script>

<script>
	import IoIosArrowUp from 'svelte-icons/io/IoIosArrowUp.svelte'
	import IoIosArrowDown from 'svelte-icons/io/IoIosArrowDown.svelte'
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications/src/index.js'
	import GameInfo from '../components/GameInfo.svelte'

   	async function handleSubmit(event) {
		loading = true;
		
		let res = await fetch(`games`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: event.target.gameTitle.value,
				genre: event.target.gameGenre.value,
				description: event.target.gameDescription.value
			})
		})

		let json = await res.json()

		loading = false
		if(res.ok) {
			games = [...games, json]
			sortBy()
			notifier.info(`Added ${json.title}`)
			event.target.gameTitle.value = ''
			event.target.gameGenre.value = ''
			event.target.gameDescription.value = ''
		} else {
			notifier.danger(`Failed to add game`)
		}
	}
	
	function deleteGame(event) {
		console.log(event)
		console.log(games.filter(game => game._id != event.detail._id))
		games = games.filter(game => game._id != event.detail._id);
		//sortBy()
	}

	let currentSort = 'none'
	let sortReversed = false
	function sortBy(sort) {
		if(sort) {
			if(sort == currentSort) {
				sortReversed = !sortReversed
			} else {
				sortReversed = false
			}
			currentSort = sort
		}

		if(currentSort != 'none') {
			games = games.sort((a, b) => {
				var propA = a[currentSort].toUpperCase();
				var propB = b[currentSort].toUpperCase();
				if (propA < propB) {
					return sortReversed ? 1 : -1;
				}
				if (propA > propB) {
					return sortReversed ? -1 : 1;
				}
				return 0;
			})
		}
		showSort = false
	}

	export let loading = false
	export let games

	let showSort = false
	let gameEntry
	let notif
</script>
<NotificationDisplay bind:this={notif} />

<div class="card" style="margin-bottom: 20px;">
	<div class="card-body">
		<form on:submit|preventDefault="{handleSubmit}">
		<div class="form-group">
			<label for="gameTitle">Game Title</label>
			<input type="text" class="form-control" id="gameTitle" placeholder="Minecraft">
		</div>
		<div class="form-group">
			<label for="gameGenre">Game Genre</label>
			<input type="text" class="form-control" id="gameGenre" placeholder="ARPG">
		</div>
		<div class="form-group">
			<label for="gameDescription">Description</label>
			<textarea class="form-control" id="gameDescription" rows="3"></textarea>
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
	{#if loading}
	<div id="overlay" class="d-flex justify-content-center align-items-center">
		<div class="spinner-border" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	</div>
	{/if}
</div>

<div class="dropdown" style="margin-bottom: 20px">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" on:click={() => {showSort = !showSort}}>
    Sort by
  </button>
  <div class="dropdown-menu" class:show='{showSort}' aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" class:show={showSort} on:click={() => sortBy('title')} href="#">
		Title
		{#if currentSort == 'title'}
			{#if sortReversed}
				<span class="icon">
					<IoIosArrowUp/>
				</span>
			{:else}
				<span class="icon">
					<IoIosArrowDown/>
				</span>
			{/if}
		{/if}
	</a>
    <a class="dropdown-item" class:show={showSort} on:click={() => sortBy('genre')} href="#">
		Genre
		{#if currentSort == 'genre'}
			{#if sortReversed}
				<span class="icon">
					<IoIosArrowUp/>
				</span>
			{:else}
				<span class="icon">
					<IoIosArrowDown/>
				</span>
			{/if}
		{/if}
	</a>
    <a class="dropdown-item" class:show={showSort} on:click={() => sortBy('description')} href="#">
		Description
		{#if currentSort == 'description'}
			{#if sortReversed}
				<span class="icon">
					<IoIosArrowUp/>
				</span>
			{:else}
				<span class="icon">
					<IoIosArrowDown/>
				</span>
			{/if}
		{/if}
	</a>
  </div>
</div>
<div class="list-group">
	{#each games as game}
		<GameInfo {...game} on:delete={deleteGame}/>
	{/each}
</div>

<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img src="..." class="rounded mr-2" alt="...">
    <strong class="mr-auto">Bootstrap</strong>
    <small class="text-muted">just now</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    See? Just like this.
  </div>
</div>

