<template>
  <div>
    <h2>{{ editingId ? 'Edit Orc' : 'Create Orc' }}</h2>
    <form @submit.prevent="saveOrc">
      <input v-model="form.name" placeholder="Name" />
      <textarea v-model="form.clan" placeholder="Clan"></textarea>
      <button type="submit">{{ editingId ? 'Update' : 'Create' }}</button>
      <button v-if="editingId" type="button" @click="cancelEdit">Cancel</button>
    </form>

    <h2>All Orcs</h2>
    <ul>
      <li v-for="orc in orcs" :key="orc.id">
        <strong>{{ orc.name }}</strong>
        <p>{{ orc.clan }}</p>
        <button @click="editOrc(orc)">Edit</button>
        <button @click="deleteOrc(orc.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import orcService from '../services/orcService';

const orcs = ref([]);
const form = ref({ name: '', clan: '' });
const editingId = ref(null);

const fetchOrcs = async () => {
  orcs.value = await orcService.getAll();
};

const saveOrc = async () => {
  if (editingId.value) {
    await orcService.update(editingId.value, form.value);
    editingId.value = null;
  } else {
    await orcService.create(form.value);
  }
  form.value = { name: '', clan: '' };
  fetchOrcs();
};

const editOrc = (orc) => {
  form.value = { name: orc.name, clan: orc.clan };
  editingId.value = orc.id;
};

const cancelEdit = () => {
  editingId.value = null;
  form.value = { name: '', clan: '' };
};

const deleteOrc = async (id) => {
  await orcService.delete(id);
  fetchOrcs();
};

onMounted(fetchOrcs);
</script>
