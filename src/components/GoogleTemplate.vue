<template>
  <el-dialog
    ref="modal"
    class="google-promo-modal"
    :visible="show"
    @update:visible="$emit('update:show', false)"
  >
    <div class="google-promo">
      <h1>Please Enter your Email</h1>
      <div class="EmailBox">
        <input type="email" class="emailInput" />
        <el-button size="small" class="sendBtn" @click="toggleClass">
          Send
        </el-button>
      </div>
      <br />
    </div>
  </el-dialog>
</template>
  
  <script>
export default {
  name: "GoogleTemplate",

  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.$root.$on("social_shares_open", (payload) => {
      this.gaEventClick(`social ${payload}`);
    });
  },
  methods: {
    handleFAQ() {
      this.$router.push({ path: "/faq" });
    },
  },
};
</script>
  
  <style lang="scss">
.google-promo {
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.google-promo-modal {
  .el-dialog {
    &__header {
      padding-bottom: 0;
    }

    h1 {
      margin-top: 0;
    }
  }
}
.emailInput {
  padding: 6px 6px;
}

.EmailBox {
  display: flex;
  flex-direction: column;
  width: 200px;
  justify-content: center;
  align-items: center;
}

.sendBtn {
  margin-top: 10px !important;
  width: 100px;
}
</style>
  