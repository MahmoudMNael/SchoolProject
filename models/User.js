class User{
    constructor(name,email,password, role ,id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.id = id;
    }

    static constructobject({name,email,password,role,id}){
        let User = new User();
        User.name = name;
        User.email = email;
        User.password = password;
        User.role = role;
        User.id = id;
        return User;
    }
}

export {User};