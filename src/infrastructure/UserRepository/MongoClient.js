import { MongoClient } from "mongodb"
import { config } from "../Shared/config"

export const mongoClient = new MongoClient(
  `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.address}:${config.mongo.port}`,
  //`mongodb://https://eu-central-1.aws.data.mongodb-api.com/app/data-ldlvf/endpoint/data/v1`,
)
