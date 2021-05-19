// Functions
const iniciarApp = () => {
	resetFormulario();
	disableSubmit();
	getData();
	cargarEventListener();
};
const resetFormulario = () => {
	formulario.reset();
};
const disableSubmit = () => {
	btnSubmit.disabled = true;
	btnSubmit.classList.remove("cursor-allowed");
	btnSubmit.classList.add("opacity-50", "cursor-not-allowed");
};
const enableSubmit = () => {
	btnSubmit.disabled = false;
	btnSubmit.classList.remove("opacity-50", "cursor-not-allowed");
	btnSubmit.classList.add("cursor-allowed");
};
const validarTweet = (e) => {
	if (e.target.value === "") {
		disableSubmit();
	} else {
		enableSubmit();
	}
};
const agregarTweet = (e) => {
	e.preventDefault();
	const tweet = {
		content: inputTweet.value,
		id: Date.now(),
	};
	arrayTweets.push(tweet);
	localStorage.setItem("tweets", JSON.stringify(arrayTweets));
	mostrarTweets();
};
const mostrarTweets = () => {
	limpiarHTML();
	const template = document.querySelector("#template-li").content;
	const fragment = document.createDocumentFragment();
	arrayTweets.forEach((tweet) => {
		const { content, id } = tweet;
		template.querySelector("#borrar-item").setAttribute("data-id", id);
		template.querySelector("p.text-tweet").textContent = content;
		const clone = template.cloneNode(true);
		fragment.appendChild(clone);
	});
	listaTweetHTML.appendChild(fragment);
};
const limpiarHTML = () => {
	while (listaTweetHTML.firstChild) {
		listaTweetHTML.removeChild(listaTweetHTML.firstChild);
	}
};
const borrarTweet = (e) => {
	if (e.target.classList.contains("borrar-item")) {
		const id = parseInt(e.target.getAttribute("data-id"));
		arrayTweets = arrayTweets.filter((tweet) => tweet.id !== id);
		mostrarTweets();
		localStorage.setItem("tweets", JSON.stringify(arrayTweets));
	}
};
const getData = () => {
	if (localStorage.getItem("tweets")) {
		arrayTweets = JSON.parse(localStorage.getItem("tweets"));
		mostrarTweets();
	}
};
// Variables
const formulario = document.querySelector("#form");
const inputTweet = formulario.querySelector("#tweet");
const listaTweetHTML = document.querySelector("#lista-tweets");
const btnSubmit = formulario.querySelector("#submit");
let arrayTweets = [];
// Events
const cargarEventListener = () => {
	inputTweet.addEventListener("blur", validarTweet);
	formulario.addEventListener("submit", agregarTweet);
	listaTweetHTML.addEventListener("click", borrarTweet);
};
document.addEventListener("DOMContentLoaded", iniciarApp);
