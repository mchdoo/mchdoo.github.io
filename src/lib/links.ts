import type { Link } from './types';

export const links: Array<Link> = [
	{
		title: 'sobre mí',
		info: 'conocé más sobre mí',
	},
	{
		title: 'proyectos',
		info: '(en progreso)',
		sublinks: [{ title: 'wishlist' }, { title: 'blog' }]
	},
	{
		title: 'galería',
		link: '/galeria',
		standout: true,
		info: 'mis renders favoritos. los vas a poder ver todos y comentar'
	},
	{
		title: 'contacto',
		link: 'https://walink.co/49d13c',
		targetBlank: true,
		info: 'hablame a mi whatsapp!',
	}
];
