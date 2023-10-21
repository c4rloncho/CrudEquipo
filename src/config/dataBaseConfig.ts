// ormconfig.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'postgres',  // Cambia 'localhost' por 'postgres'
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'bacesita',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrations: ['dist/migration/*.js'], 
    autoLoadEntities: true,
    synchronize: true,
};

export default config;