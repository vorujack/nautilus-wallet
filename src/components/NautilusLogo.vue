<script setup lang="ts">
import { HTMLAttributes } from "vue";
import { cn } from "@/common/utils";
import { MAINNET } from "@/constants/ergo";

interface Props {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const testnet = !MAINNET;
const staging = import.meta.env.MODE === "staging";
const displayName = staging ? "Abyss" : testnet ? "Testnet" : "Mainnet";
const logo = staging
  ? "/icons/app/logo-staging.svg?url"
  : testnet
    ? "/icons/app/logo-testnet.svg?url"
    : "/icons/app/logo-mainnet.svg?url";
</script>

<template>
  <div class="text-center">
    <div class="min-h-max" :class="testnet || staging ? '-mb-4' : ''">
      <img :src="logo" :class="cn('inline-block size-10 min-w-max', props.class)" />
    </div>

    <span
      v-if="staging || testnet"
      class="select-none rounded px-1 py-0 text-xs uppercase"
      :class="{ 'bg-yellow-300 text-gray-700': testnet, 'text-light-100 bg-indigo-600': staging }"
    >
      {{ displayName }}
    </span>
  </div>
</template>
