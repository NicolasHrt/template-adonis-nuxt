<script setup lang="ts">
import { useUserStore } from '~/store/user'

const links = [{
  label: 'Tab 1',
  icon: 'i-heroicons-book-open'

}, {
  label: 'Tab 2',
  icon: 'i-heroicons-square-3-stack-3d'

}, {
  label: 'Pricing',
  icon: 'i-heroicons-rocket-launch'

}]

const isPricingOpen = ref(false)
const user = useUserStore()
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <h1
        class="text-2xl"
      >
        My Saas
      </h1>
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
