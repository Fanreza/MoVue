<script setup lang="ts"></script>

<template>
  <Menubar class="border-none">
    <MenubarMenu>
      <slot name="menu-trigger"></slot>
      <MenubarContent>
        <slot name="menu-content"></slot>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>

<style scoped></style>
