<script setup lang="ts">
const links = [{
  label: 'Tab 1',
  icon: 'i-heroicons-book-open',
  to: '/getting-started'
}, {
  label: 'Tab 2',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/pro'
}, {
  label: 'Pricing',
  icon: 'i-heroicons-rocket-launch',
  to: '/releases'
}]

const isPricingOpen = ref(false)
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtLink
        to="/app"
        class="text-2xl"
      >
        My Saas
      </NuxtLink>
    </template>

    <template #right>
      <UButton
        label="Upgrade Now !"
        @click="isPricingOpen=true"
      />
      <UColorModeButton />
      <AccountDropdown />
      <UModal
        v-model="isPricingOpen"
      >
        <div class="p-4">
          <PricingContent />
        </div>
      </UModal>
    </template>

    <template #panel />
  </UHeader>
</template>
