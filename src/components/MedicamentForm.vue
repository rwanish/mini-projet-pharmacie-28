<script setup>
import { defineProps, reactive, ref, watch, defineEmits } from "vue";
import ListeMedicament from "./ListeMedicament.vue";

const props = defineProps({
  medicament: Object, // Reçoit un médicament à modifier si présent
});

// Émission de l'événement d'ajout et de modifier
const emit = defineEmits(["addMedicament", "updateMedicament"]);

// Permet d'ouvrir/fermer le popup quand on click le bouton (POPUP Forme)
const dialog = ref(false);

//Copie locale du médicament pour éviter les problèmes de réactivité
const medicamentLocal = reactive({
  id: null,
  denomination: "",
  qte: 0,
  formepharmaceutique: "",
  photo: null, 
});

const isEditing = ref(false); // Vérifie si on est en mode édition

// Fonction pour gérer l'upload de l'image
const handleFileUpload = (event) =>  {
  const file = event.target.files[0];
  if (!file) return; // Si l'utilisateur annule la sélection du fichier, on ne fait rien

  const reader = new FileReader(); // Création d'un lecteur de fichier
  reader.onload = () => {
    medicamentLocal.photo = reader.result; // Stocke l'image convertie en Base64
  };
  reader.readAsDataURL(file); // Convertit le fichier en Base64
};


// Fonction pour réinitialiser le formulaire après soumission
function resetForm() {
  Object.assign(medicamentLocal,  {
    id: null,
    denomination: "",
    qte: "",
    formepharmaceutique: "",
    photo: null
  });
  isEditing.value = false;
}

//  Watch pour détecter un changement dans le médicament sélectionné
watch(
  () => props.medicament,
  (newMedicament) => {
    console.log("🕵️‍♂️ watch détecte un changement :", newMedicament);

    if (newMedicament && newMedicament.id !== null) {
      console.log("📋 Médicament sélectionné :", newMedicament);

     // Met à jour les champs du formulaire un par un
      medicamentLocal.id = newMedicament.id;
      medicamentLocal.denomination = newMedicament.denomination;
      medicamentLocal.qte = newMedicament.qte;
      medicamentLocal.formepharmaceutique = newMedicament.formepharmaceutique;
      medicamentLocal.photo = newMedicament.photo;

      isEditing.value = true;
    } else {
      // Réinitialiser si aucun médicament n'est sélectionné
      resetForm();
    }
  },
  { deep: true, immediate: true } //Ajout de deep: true pour mieux observer l'objet
);

// Soumission du formulaire : ajout et modification
function submitForm(){
  console.log("🖼️ Ancienne photo dans props.medicament :", props.medicament?.photo);
  console.log("🆕 Nouvelle photo dans medicamentLocal :", medicamentLocal.photo);


  if (!medicamentLocal.denomination || !medicamentLocal.qte || !medicamentLocal.formepharmaceutique || !medicamentLocal.photo) {
    console.error("Tous les champs doivent être remplis !");
    return;
  }

  if (medicamentLocal.qte < 0) {
  console.error("La quantité ne peut pas être négative !");
  alert("La quantité doit être supérieure ou égale à 0 !");
  return;
  }

  // Si nous sommes en mode édition et qu'aucune nouvelle image n'a été téléchargée, conserver l'image existante
  if (isEditing.value && !medicamentLocal.photo) {
    medicamentLocal.photo = props.medicament?.photo; // On garde l'image actuelle
    console.log("✅ On garde l'ancienne photo :", medicamentLocal.photo);
  }

  const updatedMedicament = { ...medicamentLocal };

  // Vérifier si la photo a changé
  if (isEditing.value && medicamentLocal.photo === props.medicament?.photo) {
    delete updatedMedicament.photo; // Ne pas envoyer la photo si elle n'a pas changé
    console.log("🚫 Aucune modification d'image, on ne l'envoie pas !");
  }

  console.log("📡 Médicament envoyé :", updatedMedicament);

  if (isEditing.value) {
    emit("updateMedicament", updatedMedicament);
  } else {
    emit("addMedicament", updatedMedicament);
  }

  resetForm();
  dialog.value = false; // Ferme le popup après validation
};

</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" color="teal-darken-3" class="ma-2">
        ➕ Ajouter Médicament
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h6">
        {{ isEditing ? "Modifier un Médicament" : "Ajouter un Médicament" }}
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">

          <!-- Affichage de l'image -->
          <div v-if="medicamentLocal.photo" class="text-center mb-3">
            <img
              :src="medicamentLocal.photo.startsWith('data:image') ? medicamentLocal.photo : 'https://apipharmacie.pecatte.fr/images/' + medicamentLocal.photo"
              alt="Image du médicament"
              width="100"
            />
          </div>

          <v-text-field v-model="medicamentLocal.denomination" label="Dénomination" required />
          <v-text-field v-model.number="medicamentLocal.qte" type="number" label="Quantité" min="0" required />
          <v-text-field v-model="medicamentLocal.formepharmaceutique" label="Forme Pharmaceutique" required />

          <!-- Ajouter un champ pour télécharger une nouvelle photo -->
          <v-file-input label="Télécharger une photo" @change="handleFileUpload"></v-file-input>
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
        <v-btn color="red-lighten-2" variant="text" @click="dialog = false">Annuler</v-btn>
        <v-btn color="teal-lighten-2" variant="flat" @click="submitForm">{{ isEditing ? "💾 Sauvegarder" : "➕ Ajouter" }}</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>
