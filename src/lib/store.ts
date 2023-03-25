import type { TipoComentario } from '$lib/types';
import { writable } from 'svelte/store';

export const commentStore = writable<TipoComentario[]>([]);