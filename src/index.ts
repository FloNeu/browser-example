import {createConnection} from "typeorm";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";

createConnection({
    driver: {
        type: "websql",
        database: "test",
        extra: {
            version: 1,
            description: "test database",
            size: 2 * 1024 * 1024
        }
    },
    entities: [
        Post,
        Category
    ],
    logging: {
        logQueries: true
    },
    autoSchemaSync: true
}).then(async connection => {

    const category1 = new Category();
    category1.name = "TypeScript";

    const category2 = new Category();
    category2.name = "Programming";

    const post = new Post();
    post.title = "Control flow based type analysis";
    post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
    post.categories = [category1, category2];

    const postRepository = connection.getRepository(Post);
    await postRepository.persist(post);

    console.log("Post has been saved: ", post);

}).catch(error => console.log("Error: ", error));