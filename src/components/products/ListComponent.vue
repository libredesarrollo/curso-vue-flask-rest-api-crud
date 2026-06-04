<template>
  <va-modal v-model="showModalSave" :hide-default-actions="true">
    <save-component
      :key="product ? product.id : 'new'"
      :productEdit="product"
      @productInsert="productInsert"
      @productUpdate="productUpdate"
    />
  </va-modal>

  <show-component
    :key="productShow.id"
    v-if="productShow"
    :id="productShow.id"
  />

  <va-card outlined class="center">
    <va-card-title> Listado Productos </va-card-title>
    
    <table class="va-table va-table--hoverable m-auto" style="margin: auto">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Opciones</th>
        </tr>
      </thead>
      
      <tbody>
        <tr
          v-for="(p, i) in products.data"
          :key="p.id"
          :class="{ selectTr: productShow && p.id === productShow.id }"
        >
          <td>{{ p.name }}</td>

          <td>
            <va-button class="mr-1" size="small" @click="openEditModal(p, i)">
              Editar
            </va-button>
            <va-button class="mr-1" size="small" @click="productShow = p">
              Ver
            </va-button>
            <va-button class="mr-1" color="danger" size="small" @click="productDelete(p, i)">
              Eliminar
            </va-button>
          </td>
        </tr>
      </tbody>
    </table>
  </va-card>

  <va-button icon-right="create" class="fab" @click="openCreateModal">
    Crear
  </va-button>
</template>

<script>
import SaveComponent from "@/components/products/SaveComponent.vue";
import ShowComponent from "@/components/products/ShowFetchComponent.vue";

export default {
  components: {
    SaveComponent,
    ShowComponent,
  },

  data() {
    return {
      products: { data: [] }, // Inicializado con la estructura correcta para evitar errores en el v-for antes del fetch
      product: null,          // Cambiado a null para representar "sin selección"
      productShow: null,       // Cambiado a null
      productIndex: 0,
      showModalSave: false,
    };
  },
  methods: {
    openCreateModal() {
      this.product = null; // Instancia limpia
      this.showModalSave = true;
    },
    openEditModal(product, index) {
      this.productIndex = index;
      this.product = { ...product }; // Clonamos el objeto para evitar que se edite en vivo en la tabla mientras escriben en el modal
      this.showModalSave = true;     // 💡 Faltaba abrir el modal aquí
    },
    productInsert(product) {
      console.log("Insertar producto");
      this.products.data.push(product);
      this.showModalSave = false; // Cerramos el modal tras guardar
    },
    productUpdate(updatedProduct) {
      // 💡 Reemplazo seguro y reactivo del objeto en el array
      this.products.data.splice(this.productIndex, 1, updatedProduct);
      this.showModalSave = false; // Cerramos el modal tras actualizar
      
      // Si el producto editado es el que se está mostrando en detalle, lo actualizamos
      if (this.productShow && this.productShow.id === updatedProduct.id) {
        this.productShow = updatedProduct;
      }
    },
    productDelete(product, index) {
      if (confirm(`¿Seguro que quieres eliminar el registro ${product.name}?`)) {
        this.products.data.splice(index, 1);
        
        if (this.productShow && this.productShow.id === product.id) {
          this.productShow = null;
        }

        fetch("http://127.0.0.1:5000/api/products/" + product.id, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((res) => console.log(res))
          .catch((err) => console.error("Error al eliminar:", err));
      }
    },
  },
  mounted() {
    fetch("http://127.0.0.1:5000/api/products/")
      .then((res) => res.json())
      .then((res) => {
        this.products = res;
      })
      .catch((err) => console.error("Error cargando productos:", err));
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
  background: #e3e3f7 !important;
}
</style>