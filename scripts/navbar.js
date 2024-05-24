let confirgmlogoutbtn = document.getElementById('logoutbtn');

confirgmlogoutbtn.addEventListener('click', () => {
	let x = confirm('Are you sure you want to log out?');
	if (x) {
		window.location.href = '../index.html';
	}
});
