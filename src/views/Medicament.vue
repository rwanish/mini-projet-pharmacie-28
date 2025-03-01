<template>
    <v-container>
      <h1>Liste des Médicaments</h1>
      <MedicamentList />
    </v-container>
</template>
  
  <script>
  import ListeMedicament from '@/components/ListeMedicament.vue';
  
  export default {
    components: {
      ListeMedicament
    }
  };
</script>