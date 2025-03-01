<template>
  <v-app-bar color="teal-lighten-2" dense>
    <v-toolbar-title>Mediluz</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field
      v-model="search"
      label="Rechercher..."
      append-inner-icon="mdi-magnify"
      dense
      solo
      hide-details
    ></v-text-field>

    <v-btn color="primary" class="ml-4">+ Ajouter médicament</v-btn>
    <v-btn class="ml-4">Se déconnecter</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    };
  }
};
</script>
