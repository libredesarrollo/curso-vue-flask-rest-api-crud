<template>
  
  <va-list v-if="product != ''" class="center">
    <va-list-separator fit="true" />

    <va-list-item>
      <va-list-item-section>
        <va-list-item-label>{{ product.name }}</va-list-item-label>
        <va-list-item-label caption>
          {{ product.category }} / {{ product.price }}$</va-list-item-label
        >
      </va-list-item-section>

      <va-list-item-section icon>
        <va-icon color="gray" name="edit" />
      </va-list-item-section>
    </va-list-item>
    <va-list-separator fit="true" />
  </va-list>
  <va-list v-else class="center">
    <va-list-separator fit="true" />

    <va-list-item>
      <va-list-item-section>
        <va-list-item-label>--</va-list-item-label>
        <va-list-item-label caption>
          -- / --$</va-list-item-label
        >
      </va-list-item-section>

      <va-list-item-section icon>
        <va-icon color="gray" name="edit" />
      </va-list-item-section>
    </va-list-item>
    <va-list-separator fit="true" />
  </va-list>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      product: "",
    };
  },
  mounted() {
    fetch("http://127.0.0.1:5000/api/products/" + this.id)
      .then((res) => res.json())
      .then((res) => (this.product = res.data));
  },
};
</script>