<template>
  <v-app-bar color="teal-lighten-2" dense>
    <v-container class="d-flex align-center justify-space-between">
      
      <!-- LOGO + NOM -->
      <router-link to="/" class="d-flex align-center text-decoration-none text-white">
        <v-icon class="mr-2">mdi-medical-bag</v-icon>
        <v-toolbar-title class="font-weight-bold text-h6 text-md-h5">
        {{ title }}
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
      
      <!-- BARRE DE RECHERCHE (Visible dans grands écrans) -->
      <v-text-field
        v-if="isLargeScreen"
        v-model="searchQuery"
        label="Rechercher..."
        density="compact"
        variant="outlined"
        clearable
        hide-details
        prepend-inner-icon="mdi-magnify"
        class="search-bar"
        @input="updateSearch"
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- BOUTONS ACTIONS -->
      <div class="d-flex align-center">
        <!-- Barre de recherche dans petits écrans (dedans d'un dialog) -->
        <v-btn v-if="!isLargeScreen" icon @click="openSearchDialog">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <!-- Bouton pour ajoute des medicaments -->
        <v-btn icon @click="$emit('addMedicament')">
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <!-- Bouton logout -->
        <v-btn icon @click="$emit('logout')">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-container>

    <!-- Dialog pour les recherches sur tel -->
    <v-dialog v-model="searchDialog" width="80%">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Rechercher</span>
          <v-btn icon @click="searchDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="searchQuery"
            label="Rechercher..."
            density="compact"
            variant="outlined"
            clearable
            hide-details
            prepend-inner-icon="mdi-magnify"
            autofocus
            @input="updateSearch"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import debounce from "lodash.debounce";
import { useDisplay } from "vuetify";

// Variables
const title = ref("APIthérapie");
const searchQuery = ref("");
const searchDialog = ref(false);
const { mdAndUp } = useDisplay(); // Detection taille de l'ecran
const isLargeScreen = computed(() => mdAndUp.value);

// Fonction pour mettre à jour la recherche avec debounce
const updateSearch = debounce(() => {
  emit("update-search", searchQuery.value);
}, 300);

// Fonction pour ouvrir la recherche sur tel
const openSearchDialog = () => {
  searchDialog.value = true;
};

// Observation de changement sur la recheche ?
watch(searchQuery, () => updateSearch());
</script>

<style scoped>
.search-bar {
  max-width: 300px;
}
</style>
