<script setup>
import { useMouse } from './useMouse'
const { x, y } = useMouse()
</script>
<template>Mouse is at {{ x }}, {{ y }}</template>