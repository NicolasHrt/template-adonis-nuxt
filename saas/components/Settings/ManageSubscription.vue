<script setup lang="ts">
import { useUserStore } from '~/store/user'

const isPricingOpen = ref(false)

const user = useUserStore()
</script>

<template>
  <div class="px-4 sm:px-6 py-6 ">
    <div
      v-if="user.data.subscription.status"
      class="flex items-center gap-2"
    >
      <p class="font-bold text-lg flex items-center gap-2">
        Active plan: <UBadge
          label="Pro"
          color="black"
          size="md"
        />
      </p>
      <UButton
        variant="link"
        label="Manage you subscription"
        :to="user.data.subscription.customerPortal"
      />
    </div>
    <div
      v-else
      class="flex items-center gap-4"
    >
      <p class="font-bold text-lg">
        No active plan
      </p>
      <UButton
        label="Upgrade Now"
        @click="isPricingOpen = true"
      />
      <UModal
        v-model="isPricingOpen"
      >
        <div class="p-4">
          <PricingContent />
        </div>
      </UModal>
    </div>
  </div>
</template>

<style scoped>

</style>
