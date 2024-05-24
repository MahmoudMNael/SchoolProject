let nightbtn = document.getElementById('colorModeBtn');

window.onload = () => {
	let Root = document.querySelector(':root');
	if (localStorage.getItem('isNight') == 'true') {
		Root.style.setProperty('--navColor', '#2f3e46');
		Root.style.setProperty('--primaryBG', 'white');
		Root.style.setProperty('--secondaryBG', 'whitesmoke');
		Root.style.setProperty('--primary', '#84a98c');
		Root.style.setProperty('--fontcolor', 'black');
	} else {
		Root.style.setProperty('--navColor', '#2f3e46');
		Root.style.setProperty('--primaryBG', 'rgb(21, 32, 43)');
		Root.style.setProperty('--secondaryBG', 'rgb(56, 68, 77)');
		Root.style.setProperty('--primary', '#004080');
		Root.style.setProperty('--fontcolor', 'white');
	}
};

nightbtn.addEventListener('click', () => {
	let Root = document.querySelector(':root');
	if (!(localStorage.getItem('isNight') == 'true')) {
		Root.style.setProperty('--navColor', '#2f3e46');
		Root.style.setProperty('--primaryBG', 'white');
		Root.style.setProperty('--secondaryBG', 'whitesmoke');
		Root.style.setProperty('--primary', '#84a98c');
		Root.style.setProperty('--fontcolor', 'black');
		localStorage.setItem('isNight', 'true');
	} else {
		Root.style.setProperty('--navColor', '#2f3e46');
		Root.style.setProperty('--primaryBG', 'rgb(21, 32, 43)');
		Root.style.setProperty('--secondaryBG', 'rgb(56, 68, 77)');
		Root.style.setProperty('--primary', '#84a98c');
		Root.style.setProperty('--fontcolor', 'white');
		localStorage.setItem('isNight', 'false');
	}
});

let colorModeBtn = document.querySelector('#colorModeBtn');
let colorModeIcon = document.querySelector('#colorModeIcon');

colorModeBtn.addEventListener('click', () => {
	if (colorModeIcon.classList.contains('fa-moon')) {
		colorModeIcon.classList.remove('fa-moon');
		colorModeIcon.classList.add('fa-sun');
	} else {
		colorModeIcon.classList.remove('fa-sun');
		colorModeIcon.classList.add('fa-moon');
	}
});

let confirgmlogoutbtn = document.getElementById('logoutbtn');

confirgmlogoutbtn.addEventListener('click', () => {
	let x = confirm('Are you sure you want to log out?');
	if (x) {
		window.location.href = '../index.html';
	}
});

/*
    use nightbtn as class to access the swap button.

    name of the avilable vars:
        primaryBG,
        secondaryBG,
        primary,
        fontcolor
  */
