import { writable } from "svelte/store";

export const jsonDataByDate = writable({});


// Initialisation du store pour stocker la date sélectionnée
export const selectedDate = writable(new Date());

export const currentDate = writable(new Date());



