<template>
  <div class="home-view">
  <div class="home-fullscreen">
    <div class="content-overlay">
      <h1 class="text-h3 font-weight-bold text-white">Explorez votre inventaire en un clic</h1>
      <p class="text-subtitle-1 text-white mt-2">Gestion de stock simple, rapide et efficace</p>
      <v-btn color="teal-lighten-1" size="large" class="mt-6" to="/medicaments">
        Voir le stock
      </v-btn>
    </div>
  </div>
</div>
</template>

<style scoped>
.home-view {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.home-fullscreen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: url('../assets/bg-Pharma.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 600px;
  z-index: 1;
}

/* Remplace les styles de conteneurs Vuetify */
:deep(.v-container) {
  padding: 0 !important;
  margin: 0 !important;
  max-width: none !important;
}

:deep(.v-row),
:deep(.v-col) {
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.v-main__wrap) {
  padding: 0 !important;
}
</style>