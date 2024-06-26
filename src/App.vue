<template>
  <div class="app" :class="maxWidth">
    <div
      v-if="$route.meta.fullPage || $route.query.auth === 'true'"
      class="flex flex-row p-4 gap-4 items-center justify-between bg-gray-100 border-b-1 border-gray-200"
    >
      <wallet-logo root-class="ml-2" content-class="w-11 h-11" />
      <h1 class="text-base font-semibold w-full pl-2">
        <template v-if="$route.meta.title">{{ $route.meta.title }}</template>
        <template v-else>Nautilus Wallet</template>
      </h1>
    </div>
    <template v-else>
      <wallet-header v-show="!$route.meta.fullPage && $route.query.auth !== 'true'" />
      <nav-header v-if="!$route.meta.fullPage && $route.query.popup !== 'true'" />
    </template>

    <div class="flex-grow overflow-y-auto overflow-x-hidden p-4">
      <router-view />
    </div>

    <kya-modal :active="!loading.settings && !settings.isKyaAccepted" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { PRICE_FETCH_INTERVAL, REFRESH_BALANCE_INTERVAL } from "./constants/intervals";
import { ACTIONS } from "./constants/store/actions";
import KyaModal from "./components/KYAModal.vue";
import WalletLogo from "./components/WalletLogo.vue";
import { isPopup } from "@/common/browser";
import WalletHeader from "@/components/WalletHeader.vue";
import NavHeader from "@/components/NavHeader.vue";

function runSetInterval(callback: () => void, ms: number): number {
  callback();
  return setInterval(callback, ms) as unknown as number;
}

export default defineComponent({
  name: "App",
  components: {
    NavHeader,
    WalletHeader,
    KyaModal,
    WalletLogo
  },
  data: () => {
    return {
      getPriceTimerId: Object.freeze(0),
      syncTimerId: Object.freeze(0)
    };
  },
  computed: {
    ...mapState(["loading", "settings"]),
    maxWidth() {
      if (isPopup()) {
        return "max-w-365px";
      }

      return undefined;
    }
  },
  async created() {
    this.syncTimerId = Object.freeze(
      setInterval(() => {
        this.refresh();
      }, REFRESH_BALANCE_INTERVAL) as unknown as number
    );

    await this.init();
    this.getPriceTimerId = Object.freeze(
      runSetInterval(() => {
        this.fetchPrices();
      }, PRICE_FETCH_INTERVAL)
    );
  },
  deactivated() {
    clearInterval(this.getPriceTimerId);
    clearInterval(this.syncTimerId);
  },
  methods: {
    ...mapActions({
      fetchPrices: ACTIONS.FETCH_CURRENT_PRICES,
      init: ACTIONS.INIT,
      refresh: ACTIONS.REFRESH_CURRENT_ADDRESSES
    })
  }
});
</script>
