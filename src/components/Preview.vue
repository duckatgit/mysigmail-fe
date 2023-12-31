<template>
  <div class="preview" :class="{ highlight: active }">
    <div class="preview__inner">
      <div class="preview__header">
        <el-button size="small" @click="toggleClass"> Preview </el-button>
        <el-button size="small" @click="openGmail"> Gmail </el-button>
        <el-row class="signRow">
          <el-col :span="12">
            <h2>Signature preview</h2>
          </el-col>
          <!-- <el-col :span="12" style="text-align: right" class="hiddensign">
            <el-select v-model="selectTemplate" placeholder="Select template">
              <el-option
                v-for="item in template.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
              <el-option value="-1" disabled> Soon more templates </el-option>
            </el-select>
          </el-col> -->
        </el-row>
      </div>
      <div class="email-div">
        <div class="email">
          <div class="email-content">
            <div class="line short" style="margin-bottom: 30px" />
            <div class="flex">
              <div class="column-1">
                <div class="line long full" />
                <div class="line long full" />
                <div class="line long full" />
                <div class="line long full" />
                <div class="line long full" />
                <div class="line long full" />
              </div>
              <div class="column-2">
                <carbon-ad v-if="isProd" />
              </div>
            </div>
            <div class="line long" />
            <div class="line long full" />
            <div class="line long full" />
          </div>
          <div ref="preview" class="email-preview">
            <component :is="signatureTemplate" ref="template" />
          </div>
        </div>
      </div>
      <div class="actions">
        <el-button-group>
          <el-button size="small" type @click="viewSource">
            View source
          </el-button>
          <el-button size="small" @click="copySelected">
            Copy as Select
          </el-button>
          <el-button
            ref="copyHTML"
            size="small"
            type="primary"
            @click="copyHTML"
          >
            Copy as HTML
          </el-button>
          <el-button size="small" @click="sourceSelect"> Sources </el-button>
        </el-button-group>
        <br />
        <el-popover placement="top" width="260">
          <el-button slot="reference" size="small" type="text">
            Show setup instruction
          </el-button>
          <h3>Basic usage:</h3>
          <p>
            Click on "Copy as HTML" button and paste snippet of your signature
            into your email client settings.
          </p>
          <h3>Advance usage:</h3>
          <p>
            For some email clients, like gmail, you may using simply copy/paste
            highlight selection. Click on "Copy as Select" button and paste of
            your signature into your email client settings.
          </p>
        </el-popover>
      </div>
      <textarea ref="html" style="opacity: 0" />
    </div>
    <div class="preview__footer">
      <div class="preview__footer-inner">
        <donate />
        <div class="version">
          <span><a href="mailto:reshetov.art@gmail.com">contact us</a></span>
          <span>v{{ version }}</span>
          <span>
            <a
              href="https://github.com/antonreshetov/mysigmail"
              target="_blank"
            >
              <github-icon />
            </a>
          </span>
        </div>
      </div>
    </div>
    <el-dialog title="Your email signature" :visible.sync="showSource">
      <p>Copy the HTML code below and paste it to your signature file</p>
      <br />
      <el-input ref="dialogSource" v-model="html" type="textarea" :rows="10" />
      <div style="text-align: right" class="dialog-actions">
        <el-button type="primary" @click="copySource"> Copy </el-button>
      </div>
    </el-dialog>
    <success-promo :show.sync="showSuccessPromo" />
    <google-template :show.sync="showGooglePromo" :html-content="html" />
    <div>
      <el-dialog
        ref="modal"
        class="success-promo-modal"
        :before-close="handleCloseDialog"
        title="Copy Signature for:"
      >
        <div class="success-promo">
          <div class="mailIcons">
            <span style="cursor: pointer" @click="copySelect">
              <img
                ref="cropper"
                :src="gmailIcon"
                alt="crop-preview"
                height="40"
                width="40"
              />
            </span>
            <span style="cursor: pointer" @click="copySelect">
              <img
                ref="cropper"
                :src="outlook"
                alt="crop-preview"
                height="40"
                width="40"
              />
            </span>
            <span style="cursor: pointer" @click="copySelect">
              <img
                ref="cropper"
                :src="yahoo"
                alt="crop-preview"
                height="40"
                width="40"
              />
            </span>
            <span style="cursor: pointer" @click="copySelect">
              <img
                ref="cropper"
                :src="appleMail"
                alt="crop-preview"
                height="40"
                width="40"
              />
            </span>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        ref="modal"
        class="google-promo-modal"
        :visible="sourceSelectModal"
        :before-close="handleCloseDialog"
        title="Copy Signature for:"
      >
        <div class="google-promo">
          <div class="mailIcons">
            <span style="cursor: pointer" @click="copySelect">
              <img
                ref="cropper"
                :src="gmailIcon"
                alt="crop-preview"
                height="40"
                width="40"
              />
            </span>
            <span style="cursor: pointer" @click="copySelect">
              <img
                ref="cropper"
                :src="outlook"
                alt="crop-preview"
                height="40"
                width="40"
              />
            </span>
            <span style="cursor: pointer" @click="copySelect">
              <img
                ref="cropper"
                :src="yahoo"
                alt="crop-preview"
                height="40"
                width="40"
              />
            </span>
            <span style="cursor: pointer" @click="copySelect">
              <img
                ref="cropper"
                :src="appleMail"
                alt="crop-preview"
                height="40"
                width="40"
              />
            </span>
            <span style="cursor: pointer" @click="sendToGoogle">
              <img
                ref="cropper"
                :src="gsuite"
                alt="crop-preview"
                height="40"
                width="40"
              />
            </span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CarbonAd from "./CarbonAd";
import GithubIcon from "../assets/image/github.svg";
import SuccessPromo from "./SuccessPromo";
import GoogleTemplate from "./GoogleTemplate";
import Donate from "./Donate";
import gmailIcon from "../assets/img/gmail-icon-free-png.png";
import outlook from "../assets/img/outlook.png";
import yahoo from "../assets/img/yahoo.png";
import appleMail from "../assets/img/appleMail.png";
import gsuite from "../assets/img/gsuite.png";
import { EventBus } from "../util/EventBus";

export default {
  name: "Preview",

  components: {
    CarbonAd,
    GithubIcon,
    SuccessPromo,
    GoogleTemplate,
    Donate,
  },

  data() {
    return {
      html: "",
      showSource: false,
      showSuccessPromo: false,
      showGooglePromo: false,
      sourceSelectModal: false,
      version: require("../../package.json").version,
      gmailIcon,
      outlook,
      yahoo,
      appleMail,
      gsuite,
      active: false,
      htmlStructure: "",
      userName: "",
      codeHead: false,
    };
  },

  computed: {
    ...mapState(["template"]),
    ...mapGetters({
      basic: "getBasic",
      options: "getOptions",
      template: "getTemplate",
    }),
    signatureTemplate() {
      const template = this.template.selected;
      return () => import(`./templates/${template}`);
    },
    selectTemplate: {
      get() {
        return this.template.selected;
      },
      set(v) {
        this.$store.dispatch("updateTemplate", v);
      },
    },
    isProd() {
      return process.env.NODE_ENV === "production";
    },
  },
  watch: {
    "$route.query.code": {
      immediate: true, // Trigger the handler immediately on component creation
      handler(newCode, oldCode) {
        if (newCode) {
          const isGoogle = localStorage.getItem("localData");
          if (isGoogle == "local") {
            console.log("donees");
            this.codeHead = true;
            this.fetchHtmlStructure();
          }
        }
      },
    },
  },
  mounted() {
    const currentPath = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(currentPath, "dess");
    console.log(code, "dess");
    if (code) {
      this.codeHead = true;
    }
  },

  methods: {
    async fetchHtmlStructure() {
      try {
        // Call the computed property as a method and wait for the Promise to resolve
        const renderedHtml = this.$refs.template.$el.outerHTML;
        this.htmlStructure = renderedHtml;
        this.sendToGoogle(this.htmlStructure);
      } catch (error) {
        console.error("Error fetching signature template:", error);
      }
    },
    async sendToGoogle(structure) {
      try {
        if (this.codeHead == true) {
          const baseURL = process.env.VUE_APP_API_BASE_URL;
          const codeParam = this.$route.query.code;
          this.$refs.html.innerHTML = this.parseHTML();
          this.html = this.parseHTML();
          const isGoogle = localStorage.getItem("localData");
          console.log("google", this.html);

          const response = await fetch(`${baseURL}/upload/signatureCallback`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              structure: isGoogle === "local" ? structure : this.html,
              codeParam,
            }),
          });
          if (response.status === 200) {
            const result = await response.json();
            this.userName = result.userName;
            this.sourceSelectModal = false;
            EventBus.$emit("dataChanged", this.userName);
            // Handle the result as needed
          } else {
            console.error("An error occurred:", response.statusText);
          }
        } else {
          try {
            const baseURL = process.env.VUE_APP_API_BASE_URL;
            const URL = `${baseURL}/upload/sendSignatureTemplateDemo`;

            const response = await fetch(URL, {
              method: "POST",
            });

            if (response.status === 200) {
              console.log(response);
              const result = await response.json();
              window.location.href = result.url;
              // Process the result
            } else {
              console.error("An error occurred:", response.status);
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    parseHTML() {
      return this.$refs.template.$el.outerHTML.replace(/<!---->/g, "");
    },
    toggleClass() {
      this.active = !this.active; // Toggle the class when the button is clicked
    },
    openGmail() {
      this.showGooglePromo = true;
      this.$refs.html.innerHTML = this.parseHTML();
      this.html = this.parseHTML();
      this.$refs.googleTemplate.setHtmlContent(htmlContent);
      this.$refs.html.select();
      document.execCommand("copy");
      this.gaEventClick("Gmail");
    },
    sourceSelect() {
      this.$refs.html.innerHTML = this.parseHTML();
      this.$refs.html.select();
      document.execCommand("copy");
      this.gaEventClick("copy as HTML");
      this.sourceSelectModal = true;
    },
    copyHTML() {
      this.$refs.html.innerHTML = this.parseHTML();
      this.$refs.html.select();
      document.execCommand("copy");
      this.gaEventClick("copy as HTML");
      this.showSuccessPromo = true;
    },
    async sendGsuite() {
      // try {
      //   const baseURL = process.env.VUE_APP_API_BASE_URL;
      //   const URL = `${baseURL}/upload/sendSignatureTemplateDemo`;
      //   const response = await fetch(URL, {
      //     method: "POST",
      //   });
      //   if (response.status === 200) {
      //     console.log(response);
      //     const result = await response.json();
      //     window.open(result.url, "_blank");
      //     // Process the result
      //   } else {
      //     console.error("An error occurred:", response.status);
      //   }
      // } catch (error) {
      //   console.error("An error occurred:", error);
      // }
    },
    copySelect() {
      if (window.getSelection) {
        this.$router.push({ path: "/faq" });
        let range = document.createRange();
        range.selectNode(
          this.$refs.preview.querySelector(".email-preview div")
        );
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        this.gaEventClick("copy as select");
        this.showSuccessPromo = true;
      }
    },
    copySelected() {
      if (window.getSelection) {
        let range = document.createRange();
        range.selectNode(
          this.$refs.preview.querySelector(".email-preview div")
        );
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        this.gaEventClick("copy as select");
        this.showSuccessPromo = true;
      }
    },
    viewSource() {
      this.html = this.parseHTML();
      this.showSource = true;
      this.gaEventClick("view source");
    },
    copySource() {
      this.$refs.dialogSource.select();
      document.execCommand("copy");
      this.gaEventClick("copy source");
      this.showSource = false;
      this.showSuccessPromo = true;
    },
    handleCloseDialog() {
      this.sourceSelectModal = false;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

$padding-inner: 40px 50px 20px 50px;

.mailIcons span {
  margin: 4px;
}
.el-dialog__title {
  font-size: 16px !important;
}

.mailIcons span img {
  border-radius: 50%;
  padding: 1px;
  border: 1px solid rgb(255, 255, 255);
}

.mailIcons span img:hover {
  border: 1px solid rgb(210, 210, 210);
}

.preview {
  background-color: #f6f6f6;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 1fr 50px;

  &__header {
    margin-bottom: 20px;
  }

  &__inner {
    max-width: 900px;
    padding: $padding-inner;
  }

  &__footer {
    max-width: 900px;
    text-align: right;
    align-self: flex-end;
    padding: $padding-inner;
  }

  h2 {
    line-height: 0;
  }

  p {
    margin: 0;
  }

  .actions {
    text-align: right;
    margin-top: 20px;
  }
}

.email {
  min-height: 350px;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &-content {
    padding: 20px;

    p {
      line-height: 1.5em;
      margin-bottom: 10px;
      font-size: 13px;
    }

    .line {
      height: 10px;
      background-color: #eee;
      margin: 10px 0;
      border-radius: 2px;

      &.short {
        width: 30%;
      }

      &.long {
        width: 90%;
      }

      &.half {
        width: 50%;
      }

      &.full {
        width: 100%;
      }
    }

    .flex {
      display: flex;
      width: 100%;
      margin-bottom: -10px;

      .column-1 {
        .line {
          &:first-of-type {
            margin-top: 0;
          }
        }
      }

      .column-1,
      .column-2 {
        flex-grow: 1;
      }

      .column-1 {
        width: 100%;
      }

      .column-2 {
        flex-shrink: 0;
        min-width: 320px;
      }
    }
  }

  &-preview {
    padding: 20px;
  }

  .placeholder {
    height: 100px;
    width: 100px;
    background-color: #eee;
    line-height: 0;
    font-size: 0;
  }
}

.setup-instruction {
  font-size: 12px;
}

.dialog-actions {
  text-align: right;
  margin-top: 20px;
}

.version {
  color: #aaa;
  margin-top: 10px;
  font-size: 12px;

  a {
    color: #aaa;
  }

  span {
    + span {
      &::before {
        content: "•";
        padding: 0 5px;
      }
    }
  }

  svg {
    width: 20px;
    position: relative;
    top: 5px;
    transition: all 0.2s;
  }
}

.link {
  text-decoration: underline;
  color: $color-primary;
  cursor: pointer;
}

.highlight .email {
  width: 50%;
}
// .highlight .signRow.el-row {
//   display: flex;
//   width: 50%;
//   flex-direction: column;
// }
.highlight .email-div {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
