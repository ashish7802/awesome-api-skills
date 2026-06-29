<script setup>
const { data, pending, error } = await useFetch('/api/hello')
</script>
<template>
  <div v-if="pending">Loading...</div>
  <div v-else>{{ data }}</div>
</template>