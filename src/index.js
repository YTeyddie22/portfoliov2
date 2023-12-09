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

//? NAV

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
const navSlider = function () {
	burger.addEventListener("click", () => {
		mobileNavSection.classList.toggle("navigation-active");
		navSection.classList.toggle("hide_nav");

		mobileLinks.forEach((el, i) => {
			if (el.style.animation) {
				return;
			} else {
				el.style.animation = `navLinksMovement 1.5s ease forwards ${
					i / 7 + 0
				}s`;
			}
		});

		burger.classList.toggle("menu");
	});
};

navSlider();

//! Nav selection EVENT Desktop

const navScrollBehavior = function (e) {
	const navLinks = e.target
		.closest(".navigation")
		.querySelectorAll(".nav__link");

	if (navLinks) {
		const id = e.target.getAttribute("href");
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	}
};

//! Nav selection EVENT Desktop

const mobileNavScrollBehavior = function (e) {
	const mobileNavLinks = e.target
		.closest(".navigation")
		.querySelectorAll(".mobile_link");

	if (mobileNavLinks) {
		const id = e.target.getAttribute("href");
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
		navSection.classList.remove("hide_nav");
	}
};

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

//! ADDEVENTLISTENERS

nav.addEventListener("click", navScrollBehavior);

//! 4. Show Contents on scroll
//* Observer Function

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
platforms();
setInterval(platforms, 20000);
