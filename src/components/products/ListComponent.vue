<template>
  
  <va-modal v-model="showModalSave">
    <save-component
      :key="product"
      :productEdit="product"
      @productInsert="productInsert"
      @productUpdate="productUpdate"
    />
  </va-modal>

  <show-component
    :key="productShow"
    v-if="productShow != ''"
    :id="productShow.id"
  />

  <va-card outlined class="center">
    <va-card-title> Listado Productos </va-card-title>
    <table class="va-table va-table--hoverable m-auto" style="margin: auto">
      <tr>
        <th>Nombre</th>
        <th>Opciones</th>
      </tr>
      <tr
        v-for="(p, i) in products.data"
        :key="p.id"
        :class="{ selectTr: p == productShow }"
      >
        <td>
          {{ p.name }}
        </td>

        <td>
          <va-button class="mr-1" size="small" @click="productEdit(p, i)"
            >Editar</va-button
          >
          <va-button class="mr-1" size="small" @click="productShow = p"
            >Ver</va-button
          >
          <va-button
            class="mr-1"
            color="danger"
            size="small"
            @click="productDelete(p, i)"
            >Eliminar</va-button
          >
        </td>
      </tr>
    </table>
  </va-card>

  <va-button icon-right="create" class="fab" @click="product = ''; showModalSave = !showModalSave"
    >Crear</va-button
  >
</template>

<script>
import SaveComponent from "./SaveComponent";
import ShowComponent from "./ShowFetchComponent";

export default {
  components: {
    SaveComponent,
    ShowComponent,
  },

  data() {
    return {
      products: [],
      product: "",
      productShow: "",
      productIndex: 0,
      showModalSave: false,
    };
  },
  methods: {
    productInsert: function (product) {
      console.log("Insertar producto");
      this.products.data.push(product);
    },
    productEdit: function (product, index) {
      this.productIndex = index;
      this.product = product;
      console.log("Editar");
    },
    productDelete: function (product, index) {
      if (confirm("¿Seguro que quieres eliminar el registro " + product.name)) {
        this.products.data.splice(index, 1);

        fetch("http://127.0.0.1:5000/api/products/" + product.id, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((res) => console.log(res));
      }
    },
    productUpdate: function (product) {
      this.products.data[this.productIndex].name = product.name;
      this.products.data[this.productIndex].category = product.category;
      this.products.data[this.productIndex].category_id = product.category_id;
      this.products.data[this.productIndex].price = product.price;
    },
  },
  mounted() {
    fetch("http://127.0.0.1:5000/api/products/")
      .then((res) => res.json())
      .then((res) => (this.products = res));
  },
};
</script>

<style>
.fab {
  position: fixed !important;
  margin-top: -50px !important;
  margin-right: 23px !important;
  top: 100%;
  right: 0;
}
.selectTr {
  background: #e3e3f7;
}
</style>