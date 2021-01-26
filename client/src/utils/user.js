import { convertPhotosListToObject } from './helpers';

class User{

    constructor(user){
        this.id = user.id;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.photo = user.photo_200;
    }

    getId(){
        return this.id;
    }

    getFirstName(){
        return this.firstName;
    }

    getLastName(){
        return this.lastName;
    }

    getPhoto(){
        return this.photo;
    }

    async getArchive(){

        const archive = convertPhotosListToObject([
            {
                "bw": "/uploads/examples/example_1_bw.png",
                "c": "/uploads/examples/example_1_c.png"
            },
            {
                "bw": "/uploads/examples/example_2_bw.jpg",
                "c": "/uploads/examples/example_2_c.jpg"
            }
        ])

        return archive;
    }

}

export default User;