<template>
  <v-app-bar color="teal-lighten-2" dense>
    <v-container class="d-flex justify-space-between align-center">
      <h1>Ma Pharmacie</h1>
      
      <!-- Champ de recherche -->
      <v-text-field 
        v-model="search"
        label="Rechercher un médicament..."
        dense
        outlined
        hide-details
        clearable
        @update:modelValue="$emit('update:searchQuery', search)"
      ></v-text-field>

      <!-- Bouton Ajouter un Médicament -->
      <v-btn @click="$emit('addMedicament')" color="white" outlined>
        Ajouter Médicament
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
</script>
