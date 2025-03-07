<script setup lang="ts">
import { computed, HTMLAttributes, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { CheckIcon } from "lucide-vue-next";
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxRoot,
  ComboboxViewport
} from "radix-vue";
import { cn } from "@/common/utils";

interface Props {
  options: string[];
  modelValue?: string;
  prefix: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "update:modelValue", payload: string[]): void }>();

const word = useVModel(props, "modelValue", emit, { passive: true });
const highlighted = ref("");
const searchTerm = ref("");

const slice = computed(() => {
  const term = searchTerm.value.toLocaleLowerCase();
  const filtered =
    term === ""
      ? props.options
      : props.options.filter((x) => x.includes(term)).sort(rankedCompare(term));

  return filtered.slice(0, 10);
});

function rankedCompare(term: string): (a: string, b: string) => number {
  return (a, b) => {
    const aStarts = a.startsWith(term);
    const bStarts = b.startsWith(term);

    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return 0;
  };
}

function onTab() {
  if (highlighted.value === "") return;
  if (searchTerm.value == "") {
    word.value = "";
    return;
  }

  if (highlighted.value.includes(searchTerm.value.toLocaleLowerCase())) {
    word.value = highlighted.value;
  } else {
    word.value = "";
  }
}
</script>

<template>
  <ComboboxRoot
    v-model="word"
    v-model:selected-value="highlighted"
    v-model:search-term="searchTerm"
    :reset-search-term-on-select="true"
    :reset-search-term-on-blur="true"
    @keydown.tab="onTab"
  >
    <ComboboxAnchor
      :class="
        cn(
          'flex h-9 w-full cursor-text items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-start text-sm shadow-sm ring-offset-background focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:truncate',
          props.class
        )
      "
    >
      <div class="select-none text-xs font-light tabular-nums text-muted-foreground">
        {{ prefix }}
      </div>
      <ComboboxInput class="w-full bg-transparent outline-none" />
    </ComboboxAnchor>

    <ComboboxContent
      position="popper"
      :class="
        cn(
          'relative z-50 max-h-40 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1'
        )
      "
    >
      <ComboboxViewport
        tabindex="-1"
        class="h-[--radix-combobox-trigger-height] w-full min-w-[--radix-combobox-trigger-width] p-1"
      >
        <ComboboxEmpty class="py-1.5 pl-2 text-center text-xs font-medium" />

        <ComboboxItem
          v-for="option in slice"
          :key="option"
          :value="option"
          class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
        >
          {{ option }}

          <ComboboxItemIndicator
            class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center opacity-70"
          >
            <CheckIcon class="size-4" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
