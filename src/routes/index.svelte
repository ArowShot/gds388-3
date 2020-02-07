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
</style>

<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`games`).then(r => r.json()).then(games => {
			return { games };
		});
	}
</script>

<script>
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
	}

	export let loading = false
	export let games

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

