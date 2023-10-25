<template>
  <div>
    <h2>Frequently Asked</h2>
    <div
      v-for="(item, index) in accordionItems"
      :key="index"
    >
      <button
        class="accordion"
        @click="toggleAccordion(index)"
      >
        {{ item.title }}
      </button>
      <div
        class="panel"
        :class="{ active: item.isActive }"
      >
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accordionItems: [
        { title: 'Section 1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', isActive: false },
        { title: 'Section 2', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', isActive: false },
        { title: 'Section 3', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', isActive: false }
      ]
    }
  },
  methods: {
    toggleAccordion (index) {
      this.accordionItems[index].isActive = !this.accordionItems[index].isActive
    }
  }
}
</script>

<style scoped>
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active, .accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  display: none;
  background-color: white;
  overflow: hidden;
}

.active.panel {
  display: block;
}
</style>
