import { MongoClient } from "mongodb"
import { config } from "../Shared/config"

export const mongoClient = new MongoClient(
  `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.address}:${config.mongo.port}`,
)
