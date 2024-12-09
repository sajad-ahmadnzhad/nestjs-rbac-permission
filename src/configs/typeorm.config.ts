import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default (): TypeOrmModuleOptions => {
    const {
        DB_HOST,
        DB_NAME,
        DB_PORT,
        DB_SYNCHRONIZE,
        DB_USERNAME,
        DB_PASSWORD,
    } = process.env
    return {
        type: "postgres",
        database: DB_NAME,
        host: DB_HOST,
        port: Number.parseInt(DB_PORT),
        username: DB_USERNAME,
        password: DB_PASSWORD,
        synchronize: !!Number.parseInt(DB_SYNCHRONIZE),
        autoLoadEntities: true
    }
}