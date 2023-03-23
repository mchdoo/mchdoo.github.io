export interface Comentario {
	created_at?: Date;
	contenido: string;
	render: string;
	autor: string;
}

export interface Link {
	title: string;
	info?: string;
	link?: string;
	targetBlank?: boolean;
	standout?: boolean;
	sublinks?: Array<Link>
}
