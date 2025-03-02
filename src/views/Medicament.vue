<template>
  <div>
    
    <h1>Liste des Médicaments</h1>
    
    <v-container>
      <v-row justify="center" class="gap-1">
        <v-col
          v-for="medicament in filteredMedicaments"
          :key="medicament.id"
          class="d-flex justify-center pa-4"
          cols="12" sm="8" md="6" lg="4"
        >
          <MedicamentItem
            :medicament="medicament"
            @eventDelete="handlerDelete"
            @eventEdit="handlerEdit"
            @eventUpdate="handlerUpdate"
            @eventLivrer="handlerLivrer"
            @eventDispenser="handlerDispenser"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
<script setup>
import { ref, reactive, computed, watch, defineProps } from "vue";
import MedicamentItem from "../components/MedicamentItem.vue";
import Medicament from "../Medicament.js";

const props = defineProps({
  searchQuery: String, // Récupère la recherche depuis la Navbar
});

const listeMedicaments = reactive([]);

const filteredMedicaments = computed(() => {
  const searchTerm = props.searchQuery ? props.searchQuery.toLowerCase() : "";
  return listeMedicaments.filter(med => med.denomination.toLowerCase().includes(searchTerm));
});

</script>