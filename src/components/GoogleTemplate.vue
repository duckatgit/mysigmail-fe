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
        <input type="email" class="emailInput" v-model="email" />
        <el-button size="small" class="sendBtn" @click="sendEmail">
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

  data() {
    return {
      email: "", // Holds the email value entered by the user
      isValidEmail: false,
    };
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    htmlContent: {
      type: String,
      default: "",
    },
  },

  created() {
    this.$root.$on("social_shares_open", (payload) => {
      this.gaEventClick(`social ${payload}`);
    });
  },
  methods: {
    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    async sendEmail() {
      const userEmail = this.email;
      this.isValidEmail = this.validateEmail(userEmail);

      if (this.isValidEmail) {
        this.htmlContent =
          "<br/><br/><br/><br/><br/><br/><br/>" + this.htmlContent;
        const baseURL = process.env.VUE_APP_API_BASE_URL;
        const URL = `${baseURL}/upload/sendTemplate`;
        const data = {
          email: userEmail,
          emailTemplate: this.htmlContent,
        };

        try {
          const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const result = await response.json();
            this.$notify(
              {
                group: "top",
                title: "Email Sent successfully",
              },
              4000
            );
            this.$refs.modal && (this.$refs.modal.visible = false);
          } else {
            const errorResult = await response.json();
            this.$notify(
              {
                group: "top",
                title: errorResult.data,
              },
              4000
            );
          }
        } catch (error) {
          console.error("Error:", error);
          this.$notify(
            {
              group: "top",
              title: "An error occurred while sending the email",
            },
            4000
          );
        }
      } else {
        this.$notify(
          {
            group: "top",
            title: "not a valid email",
          },
          4000
        );
      }
    },

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
  