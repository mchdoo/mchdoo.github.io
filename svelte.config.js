import adapter from '@sveltejs/adapter-vercel';
// import adapter from ÷adapter-ghpages'
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({ postcss: true, typescript: true }),

	kit: {
		adapter: adapter()
	}
};

export default config;
