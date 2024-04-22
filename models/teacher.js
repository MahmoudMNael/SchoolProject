class Teacher {
	constructor(id, name, email) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	static constructObject({ id, name, email }) {
		let teacher = new Teacher();
		teacher.id = id;
		teacher.name = name;
		teacher.email = email;
		return teacher;
	}
}

export { Teacher };
