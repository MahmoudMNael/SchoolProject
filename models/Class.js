class Class{

    constructor(name,creater,id){
        this.name = name;
        this.creater = creater;
        this.id = id;
    }   

    static constructobject({name,creater,id}){
        let myClass = new Class();
        myClass.name = name;
        myClass.creater = creater;
        myClass.id = id;
    }

}    

export { Class }; 