<template>
  <v-app>
    <!-- Navbar avec événements -->
    <Navbar @update-search="updateSearchQuery" @add-medicament="isPopupVisible = true" />

    <v-main>
      <v-container>
      <router-view :searchQuery="debouncedSearch"/>
      </v-container>
      <!-- Formulaire d'ajout de médicament en popup -->
      <MedicamentForm 
        v-if="isPopupVisible" 
        :isPopupVisible="isPopupVisible"
        @addMedicament="(med) => { handlerAdd(med); $emit('refreshList'); }"
        @updateMedicament="handlerUpdate"
        @closePopup="isPopupVisible = false"
      />
    </v-main>

    <!-- Bouton flottant centré en haut -->
    <v-btn fab color="teal-lighten-2" class="fab-button" to="/medicaments">
      <v-icon>mdi-pill</v-icon>
    </v-btn>

    <!-- Footer fixe -->
    <Footer />
  </v-app>
</template>

<style scoped>
.fab-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

<script>
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import MedicamentForm from "@/components/MedicamentForm.vue";
import { useRouter } from "vue-router"; 
export default {
  components: {
    Navbar,
    Footer,
    MedicamentForm,
  },
  setup() {
    const searchQuery = ref("");
    const debouncedSearch = ref("");

    const router = useRouter();
    console.log("Rutas disponibles:", router.getRoutes()); //Si /medicament n'apparaît pas dans la console Vue Router ne le detecte pas 


    function updateSearchQuery(newQuery) {
  searchQuery.value = newQuery; // Mise à jour immédiate
  } 
    
    function handlerAdd(medicament) {
      console.log("Ajout d’un médicament :", medicament);
      isPopupVisible.value = false; // Fermer le popup après ajout
    }

    return { searchQuery, debouncedSearch, updateSearchQuery, handlerAdd };
  }
};
</script>
