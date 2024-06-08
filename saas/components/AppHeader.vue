<script setup lang="ts">
const links = [
  [{
    label: 'Tab 1',
    icon: 'i-heroicons-home',
    to: '/app'
  }, {
    label: 'Horizontal Navigation',
    icon: 'i-heroicons-chart-bar',
    to: '/app/2'
  }, {
    label: 'Command Palette',
    icon: 'i-heroicons-command-line',
    to: '/app/3'
  }]
]
</script>

<template>
  <div>
    <UContainer>
      <div class="flex justify-between items-center py-4">
        <NuxtLink
          to="/app"
          class="text-4xl font-bold"
        >
          My Saas
        </NuxtLink>
        <div class="flex items-center">
          <UHorizontalNavigation
            :links="links"
          />

          <AccountDropdown />
        </div>
      </div>
    </UContainer>
  </div>
</template>

 <style scoped>

 </style>
