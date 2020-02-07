<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`/game/${params.id}.json`)
		const json = await res.json()
		if (res.ok) {
			return { game: json, id: params.id }
		} else {
			this.error(res.status, 'Could not find game')
		}
	}
</script>

<script>
   	async function handleSubmit(event) {
		loading = true;
		
		let res = await fetch(`game/${id}.json`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(game)
		})

		let json = await res.json()

		loading = false
		if(res.ok) {
			window.location.replace('/')
		} else {
			
		}
    }

	export let game
	export let id
	let loading
</script>

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

<div class="card" style="margin-bottom: 20px;">
	<div class="card-body">
		<form on:submit|preventDefault="{handleSubmit}">
		<div class="form-group">
			<label for="gameTitle">Game Title</label>
			<input bind:value={game.title} type="text" class="form-control" id="gameTitle" placeholder="Minecraft">
		</div>
		<div class="form-group">
			<label for="gameGenre">Game Genre</label>
			<input bind:value={game.genre} type="text" class="form-control" id="gameGenre" placeholder="ARPG">
		</div>
		<div class="form-group">
			<label for="gameDescription">Description</label>
			<textarea bind:value={game.description} class="form-control" id="gameDescription" rows="3"></textarea>
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