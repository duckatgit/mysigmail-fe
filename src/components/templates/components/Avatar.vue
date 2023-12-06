<template>
  <div
    v-if="showAvatar"
    style="margin-right: 10px"
    :style="computedStyle"
    class="avatar-container"
  ></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Avatar",

  props: {
    showAvatar: {
      type: Boolean,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    roundness: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState(["basic"]),
    computedStyle() {
      const style = {
        width: this.size + "px",
        height: this.size + "px",
        borderRadius: this.roundness + "px",
        background: `url(${this.src}) center/cover no-repeat #eee`,
      };

      return style;
    },
  },
};
</script>

<style>
.avatar-container {
  margin-right: 10px;
}
</style>
