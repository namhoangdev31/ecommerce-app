import { DataSource } from "typeorm";
import ormConfig from "./ormconfig";

export const myDataSource = new DataSource(ormConfig);