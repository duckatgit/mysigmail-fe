<template>
  <el-form-item :label="name || 'No label'">
    <el-popover
      v-model="popover"
      placement="top"
      title="Edit field"
      width="350"
      trigger="manual"
    >
      <div>
        <el-form size="small">
          <el-col :span="12">
            <el-form-item label="Label">
              <el-input v-model.trim="name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Type">
              <el-select v-model="type" style="width: 100%">
                <el-option
                  v-for="item in attributes.types"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item style="text-align: right">
              <el-button type="danger" @click="onRemoveFiled">Remove</el-button>
              <el-button @click="popover = false">Close</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div slot="reference" class="popover-pos" />
    </el-popover>
    <i
      v-if="isAddonField"
      class="field-settings el-icon-setting"
      @click="onEdit"
    />
    <el-input v-model.trim="value" tabindex="1" />
  </el-form-item>
</template>

<script>
import { mapState } from "vuex";
import { EventBus } from "../util/EventBus";

export default {
  name: "",
  updateName: "",

  props: {
    isAddonField: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      popover: false,
    };
  },

  computed: {
    ...mapState(["basic", "attributes"]),
    value: {
      get() {
        return this.basic.fields[this.index].value;
      },
      set(v) {
        this.$store.dispatch("updateField", {
          index: this.index,
          data: { value: v },
        });
      },
    },
    name: {
      get() {
        return this.basic.fields[this.index].name;
      },
      set(v) {
        this.$store.dispatch("updateField", {
          index: this.index,
          data: { name: v },
        });
      },
    },
    type: {
      get() {
        return this.basic.fields[this.index].type;
      },
      set(v) {
        this.$store.dispatch("updateField", {
          index: this.index,
          data: { type: v },
        });
      },
    },
  },
  created() {
    EventBus.$on("dataChanged", (newData) => {
      console.log(newData, "newData");
      this.updateName = newData;
      if (this.updateName != " ") {
        // Find the index of the "Full Name" field in the basic fields array
        const fullNameFieldIndex = this.basic.fields.findIndex(
          (field) => field.name === "Full name"
        );

        // Check if the "Full Name" field exists and update its value
        if (fullNameFieldIndex !== -1) {
          // Set a static name for the "Full Name" field
          this.$store.dispatch("updateField", {
            index: fullNameFieldIndex,
            data: { value: this.updateName }, // Set the static name here
          });
        } else {
          console.error("Full Name field not found");
        }
      }
    });
    this.$ga.page(this.$router);
  },
  mounted() {},

  methods: {
    onEdit() {
      this.popover = !this.popover;
    },
    onRemoveFiled() {
      this.$store.dispatch("removeField", this.index);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.field-settings {
  position: absolute;
  right: -10px;
  top: 4px;
  color: $color-info;
  cursor: pointer;
  padding: 10px;
  &:hover {
    color: $color-primary;
  }
}
.popover-pos {
  position: relative;
  top: 20px;
}
</style>
