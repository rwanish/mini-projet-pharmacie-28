<template>
  <v-app>
    <Navbar @update:searchQuery="searchQuery = $event" @addMedicament="isPopupVisible = true" />

    <v-main>
    <ListeMedicament :searchQuery="searchQuery" />
      <MedicamentForm 
      v-if="isPopupVisible" 
      :isPopupVisible="isPopupVisible"
      @addMedicament="handlerAdd"
      @updateMedicament="handlerUpdate"
      @closePopup="isPopupVisible = false"
    />
    </v-main>

    <!-- Ajout dun bouton flottant pour naviguer vers la liste des médicaments -->
    <v-fab-transition>
      <v-btn fab color="teal-lighten-2" to="/medicaments" class="fab">
      <v-icon>mdi-pill</v-icon>
      </v-btn>
    </v-fab-transition>
    
    <!-- router-view endroit où le contenu des pages s'affichera -->
    <router-view></router-view>
    <Footer />
  </v-app>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

<script>
import { ref } from "vue";
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ListeMedicament from "./components/ListeMedicament.vue";
import MedicamentForm from "./components/MedicamentForm.vue";

const searchQuery = ref("");
const isPopupVisible = ref(false);

// Fonction pour ajouter un médicament (déjà existante)
function handlerAdd(medicament) {
  console.log("Ajout d’un médicament :", medicament);
  isPopupVisible.value = false; // Fermer le popup après ajout
}

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>
