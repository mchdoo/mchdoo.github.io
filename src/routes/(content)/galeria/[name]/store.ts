import type { Comentario } from '$lib/types';
import { writable } from 'svelte/store';

export const comentarios = writable<Comentario[]>([]);
