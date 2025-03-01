<template>
  <v-app>
    <Navbar />
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
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>
