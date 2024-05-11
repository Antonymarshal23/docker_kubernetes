import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./api/core/models/Product"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Marshal123@@",
    database: "spurt",
    synchronize: true,
    logging: false,
    entities: [Product],
    migrations: [],
    subscribers: [],
})


AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log('database initiated')
    })
    .catch((error) => console.log(error))