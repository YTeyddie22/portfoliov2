"use strict";

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav__links");
const mobileNavSection = document.querySelector(".mobile_menu_content");
const navLinks = document.querySelectorAll(".nav__links li");
const mobileLinks = document.querySelectorAll(".mobile_links");
const header = document.querySelector(".header");
const navSection = document.querySelector(".navigation");
const allSections = document.querySelectorAll(".section");
const platformsText = document.querySelector(".footer .section__description");
const swiperLeft = document.querySelector(".swiper-button-prev");
const swiperRight = document.querySelector(".swiper-button-next");
const imageCaption = document.querySelectorAll("figcaption");

const swiperButtons = [swiperLeft, swiperRight];

const swiper = new Swiper(".swiper", {
	// Optional parameters
	direction: "horizontal",
	loop: true,

	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 3200,
		disableOnInteraction: false,
	},

	// If we need pagination
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	// And if we need scrollbar
	scrollbar: {
		el: ".swiper-scrollbar",
	},

	autoPlay: {
		el: ".swiper-wrapper",
		delay: 3000,
	},
});

if (window.innerWidth < 600) {
	imageCaption.forEach((el) => {
		el.style.display = "none";
	});
}

//! Nav selection EVENT Desktop
document.querySelectorAll('.nav__links a[href^="#"]').forEach((link) => {
	link.addEventListener("click", (event) => {
		event.preventDefault();
		const targetId = event.target.getAttribute("href").substring(1); // Get ID from href

		document
			.getElementById(targetId)
			.scrollIntoView({ behavior: "smooth" });
	});
});

//Mobile Links function
mobileLinks.forEach((el, i) => {
	if (el.style.animation) {
		return;
	} else {
		el.style.animation = `navLinksMovement 1.5s ease forwards ${
			i / 7 + 0
		}s`;
	}
	el.addEventListener("click", function (event) {
		event.preventDefault();
		navSection.classList.add("hide_nav");
		burger.classList.toggle("menu");
		burger.closest(".header").classList.toggle("header_opacity_mobile");

		const targetId = event.target.getAttribute("href").substring(1); // Get ID from href
		document
			.getElementById(targetId)
			.scrollIntoView({ behavior: "smooth" });
	});
});

// Prevent default reloading
document.addEventListener("DOMContentLoaded", function () {
	// Check if the page has been restarted
	if (!sessionStorage.getItem("pageRestarted")) {
		// Set a flag indicating that the page has been restarted
		sessionStorage.setItem("pageRestarted", "true");
		// Reload the page with the home element
		window.location.replace(window.location.origin);
	}

	// Add an event listener for the 'beforeunload' event
	window.addEventListener("beforeunload", function () {
		// Clear the flag when the page is about to unload
		sessionStorage.removeItem("pageRestarted");
	});
});

//! Nav slide section
function navSlider() {
	burger.addEventListener("click", () => {
		mobileNavSection.classList.toggle("navigation-active");
		navSection.classList.toggle("hide_nav");
		burger.classList.toggle("menu");
		burger.closest(".header").classList.toggle("header_opacity_mobile");
	});
}

navSlider();

//! Stick Navigation

const navHeight = navSection.getBoundingClientRect().height;

const stickyNavigation = function (entries) {
	const [entry] = entries;
	if (!entry.isIntersecting) {
		nav.classList.add("sticky");
	} else {
		nav.classList.remove("sticky");
	}
};

const navObserver = new IntersectionObserver(stickyNavigation, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
});
navObserver.observe(header);

//! 4. Show Contents on scroll

const revealSections = function (entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;

	entry.target.classList.remove("section__hidden");

	observer.unobserve(entry.target);
};

//* Observer

const sectionObserver = new IntersectionObserver(revealSections, {
	root: null,
	threshold: 0.2,
});

//All sections
allSections.forEach((el) => {
	sectionObserver.observe(el);
	el.classList.add("section__hidden");
});

//Platforms

const platforms = function () {
	setTimeout(() => {
		platformsText.textContent = "GitHub";
	}, 0);
	setTimeout(() => {
		platformsText.textContent = "Instagram";
	}, 4000);
	setTimeout(() => {
		platformsText.textContent = "Twitter";
	}, 8000);
	setTimeout(() => {
		platformsText.textContent = "LinkedIn";
	}, 12000);
	setTimeout(() => {
		platformsText.textContent = "Reddit";
	}, 16000);
};

//* Slider functionality
/*
const sliders = function () {
	const slides = document.querySelectorAll(".slide");
	const leftBtn = document.querySelector(".slider__btn--left");
	const rightBtn = document.querySelector(".slider__btn--right");

	let currentSlide = 0;
	const maxSlide = slides.length - 1;

	const goToSlide = (slide) => {
		slides.forEach((el, i) => {
			return (el.style.transform = `translateX(${100 * (i - slide)}%)`);
		});
	};

	const nextSlide = () => {
		currentSlide === maxSlide ? (currentSlide = 0) : currentSlide++;
		goToSlide(currentSlide);
	};

	const prevSlide = () => {
		currentSlide === 0 ? (currentSlide = maxSlide) : currentSlide--;
		goToSlide(currentSlide);
	};

	const init = () => {
		goToSlide(0);
	};

	init();

	//* For keys
	document.addEventListener("keydown", (e) => {
		e.key === "&larr" && prevSlide;
		e.key === "&rarr" && nextSlide;
	});

	rightBtn.addEventListener("click", nextSlide);
	leftBtn.addEventListener("click", prevSlide);
};
sliders();
*/
platforms();
setInterval(platforms, 20000);
