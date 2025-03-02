<template>
  <v-footer color="teal-lighten-2" class="mt-auto footer-container">
    <v-row justify="center" class="pa-2 ma-0">
      <v-col cols="12" sm="4" class="text-center d-flex flex-column align-center">
        <strong>En collaboration avec</strong>
        <v-img
          src="../assets/logo-ISIS-horizontal.png"
          alt="Logo du partenaire"
          :width="200"
          :height="80"
          class="partner-logo"
        ></v-img>
      </v-col>
      <v-col cols="12" sm="4" class="text-center">
        <strong>2025</strong> - Dana Torrano
      </v-col>
      <v-col cols="12" sm="4" class="text-center">
        <v-btn icon color="white" class="mx-1" href="https://github.com/vuetifyjs/vuetify/">
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
.footer-container {
  position: relative;
  width: 100%;
  padding: 0;
  margin-top: 2rem;
}

</style>