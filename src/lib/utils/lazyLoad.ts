// See how the options work here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

let options = {
	root: null,
	rootMargin: '50px',
	threshold: 0.5
};

export const lazyLoad = (image: HTMLImageElement, src: string) => {
	const loaded = () => {
		image.style.opacity = '1'                  // doesn't work in REPL
	};
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			console.log('an image has loaded'); // console log for REPL
			image.src = src; // replace placeholder src with the image src on observe
			if (image.complete) {
				// check if instantly loaded
				loaded();
			} else {
				image.addEventListener('load', loaded); // if the image isn't loaded yet, add an event listener
			}
		}
	}, options);
	observer.observe(image); // intersection observer

	return {
		destroy() {
			image.removeEventListener('load', loaded); // clean up the event listener
		}
	};
};
