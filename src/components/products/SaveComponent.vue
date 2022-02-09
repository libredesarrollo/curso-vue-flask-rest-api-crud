<template>
  <h1>Registrar productos</h1>

  <form @submit="sendForm" style="max-width: 300px">
    <va-input
      class="mt-2"
      placeholder="Nombre"
      type="text"
      v-model="product.name"
    />
    <va-input
      class="mt-2"
      placeholder="Precio"
      type="number"
      v-model="product.price"
    />
    <label for="">Categoria</label>
   
    <va-select v-model="product.category" :options="categories"> </va-select>

    <va-button type="submit" class="mt-2">Enviar</va-button>
  </form>
</template>

<script>
export default {
  props: ["productEdit"],
  emits: ["productInsert", "productUpdate"],
  data() {
    return {
      categories: [],
      product: {
        name: "",
        price: "",
        category: "",
      },
    };
  },
  methods: {
    sendForm(e) {
      e.preventDefault();

      console.log(this.product);

      const formData = new FormData();

      formData.append("name", this.product.name);
      formData.append("category_id", this.product.category.value);
      formData.append("price", this.product.price);

      if (this.productEdit == "") this.insert(formData);
      else this.update(formData);
    },
    insert(formData) {
      fetch("http://127.0.0.1:5000/api/products/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((product) => this.$emit("productInsert", product.data));
    },
    update(formData) {
      fetch("http://127.0.0.1:5000/api/products/" + this.productEdit.id, {
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((product) => this.$emit("productUpdate", product.data));
    },
  },
  mounted() {
    if (this.productEdit != "") {
      this.product.name = this.productEdit.name;
      this.product.price = this.productEdit.price;
      this.product.category = {
        id: this.productEdit.category_id,
        text: this.productEdit.category
      };
    }

    fetch("http://127.0.0.1:5000/api/categories/")
      .then((res) => res.json())
      .then(
        (res) =>
          (this.categories = res.data.map((i) => {
            return {
              value: i.id,
              text: i.name,
            };
          }))
      );
  },
};
</script>