<script>
	export let segment;
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href=".">Kyle Gray</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item" class:active='{segment === undefined}'>
        <a class="nav-link" href=".">Games List</a>
      </li>
      <!-- <li class="nav-item" class:active='{segment === 'about'}'>
        <a class="nav-link" href="about">About</a>
      </li> -->
    </ul>
  </div>
</nav>