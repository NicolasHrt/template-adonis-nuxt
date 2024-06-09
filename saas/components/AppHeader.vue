<script setup lang="ts">
import { useUserStore } from '~/store/user'

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
const user = useUserStore()
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
      <div v-if="user.data.subscription.status">
        <UBadge
          label="Pro"
          color="black"
          size="md"
        />
      </div>
      <div v-else>
        <UButton
          label="Upgrade Now !"
          @click="isPricingOpen=true"
        />
        <UModal
          v-model="isPricingOpen"
        >
          <div class="p-4">
            <PricingContent />
          </div>
        </UModal>
      </div>
      <UColorModeButton />
      <AccountDropdown />
    </template>

    <template #panel />
  </UHeader>
</template>
