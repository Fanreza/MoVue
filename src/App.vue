<script setup lang="ts"></script>

<template>
  <RouterView v-slot="{ Component }">
    <BaseToast />
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="postcss"></style>
