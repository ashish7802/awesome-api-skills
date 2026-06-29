<!-- +page.svelte -->
<script>
  export let data;
  export let form;
</script>
<form method="POST">
  <input name="email" type="email" />
  <button>Submit</button>
</form>