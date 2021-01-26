import { convertPhotosListToObject } from './helpers';

class Examples{

    async getExamples(){

        const examples = convertPhotosListToObject([
                {
                    "bw": "/uploads/examples/example_1_bw.png",
                    "c": "/uploads/examples/example_1_c.png"
                },
                {
                    "bw": "/uploads/examples/example_2_bw.jpg",
                    "c": "/uploads/examples/example_2_c.jpg"
                }
            ])

        return examples;

    }

}

export default Examples;