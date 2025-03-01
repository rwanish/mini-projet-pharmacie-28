<script setup>
import { ref } from "vue";

defineProps([
  "medicament",
  "searchQuery"]);


//Émettre des événements vers le parent
const emit = defineEmits(["eventDelete", "eventEdit", "eventLivrer", "eventDispenser"]);

// Déclaration de loading
const loading = ref(false);

// ========  SURLIGNAGE DU TEXTE CORRESPONDANT À LA RECHERCHE ===============
const highlightText = (text, query) => {
  // Si la recherche est vide, retourner le texte normal
  if (!text || !query) {
    return text;
  }
  console.log("Texte original :", text); // Afficher le texte original

  // Créer une expression régulière pour trouver les termes correspondant à la recherche
  const regex = new RegExp(`(${query})`, "gi"); // "g" pour global et "i" pour insensible à la casse
  const highlightedText = text.replace(regex, `<span class="highlight">$1</span>`); // Remplacer le texte trouvé par du HTML

  console.log("Texte après surlignage :", highlightedText); // Afficher le texte après surlignage

  return highlightedText;
};

// ========  PARTIE LOADING ===============
const attenteModif = (medicament) => {
  loading.value = true; // Démarrer le loading lors du clic sur "Modifier"

  setTimeout(() =>  {
    // Simuler un traitement de modification, puis arrêter le loading
    loading.value = false;

    // Émettre l'événement de modification vers le parent
    emit("eventEdit", medicament);
  }, 2000); // Simuler un délai pour l'exemple
};

</script>

<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="text-center"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="teal-lighten-2"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <!-- Conteneur principal -->
    <div class="medicament-container">
      <!-- Image centrée -->
      <div v-if="medicament.photo" class="d-flex justify-center">
        <img 
          :src="medicament.photo.startsWith('data:image') ? medicament.photo : 'https://apipharmacie.pecatte.fr/images/' + medicament.photo"  
          alt="Image du médicament" 
          height="110"
        />
      </div>

      <!-- Titre et sous-titre centrés -->
      <v-card-item>
        <v-card-title class="text-h6">
          <strong v-html="highlightText(medicament.denomination, searchQuery)"></strong>
        </v-card-title>

        <v-card-subtitle class="d-flex justify-center align-center">
          <span class="me-1">{{ medicament.formepharmaceutique }}</span>
          <v-icon color="error" icon="mdi-pill" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

    <!-- Actions médicament -->
    <div class="d-flex align-center justify-center">
   <!-- Bouton Dispenser -->
    <v-btn 
    @click="$emit('eventDispenser', medicament)" 
    :disabled="medicament.qte <= 0"
    color="#4f545c"
    icon="mdi-minus"
    variant="tonal"
    rounded="lg"
    ></v-btn>

  <!-- Conteneur quantité -->
  <div class="qte-container text-center">
    <div class="qte">{{ medicament.qte }}</div>
    <div class="sous-titre">unités</div>
  </div>

  <!-- Bouton Livrer -->
  <v-btn 
    @click="$emit('eventLivrer', medicament)" 
    color="#4f545c"
    icon="mdi-plus"
    variant="tonal"
    rounded="lg"
  ></v-btn>
  </div>
</div>

    <v-divider class="mx-4 my-3"></v-divider>

    <!-- Boutons Modifier & Supprimer centrés -->
    <v-card-actions class="d-flex justify-center mb-2">
      <v-btn
        color="teal-lighten-2"
        text="Modifier"
        prepend-icon="mdi-pencil"
        variant="flat"
        @click="attenteModif(medicament)"
      ></v-btn>

      <v-btn
        color="teal-lighten-2"
        text="Supprimer"
        prepend-icon="mdi-trash-can"
        variant="outlined"
        @click="emit('eventDelete', medicament.id)"
      ></v-btn>
    </v-card-actions>
  </v-card>
  
</template>
<style>
.medicament-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.highlight {
  background-color: #80CBC4 !important;
  font-weight: regular;
}

.qte-container {
  display: flex;
  flex-direction: column; /* Affichage en colonne */
  align-items: center; 
  margin: 0 10px; 
}

.qte {
  font-size: 1.2rem; /* Taille plus grande pour la quantité */
  font-weight: medium;
}

.sous-titre {
  font-size: 0.9rem; /* Texte plus petit */
  color: rgb(151, 151, 151); /* Couleur plus douce */
}

</style>