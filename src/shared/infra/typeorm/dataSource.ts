import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as tls from 'tls';

dotenv.config();

// Configure o agente TLS globalmente para aceitar certificados autoassinados
const tlsConfig: tls.ConnectionOptions = {
  rejectUnauthorized: false // Configuração para aceitar certificados autoassinados
};

export const AppDataSource = new DataSource({
    type: 'mssql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        './src/**/*.entity{.ts,.js}'
    ],
    migrations: [
        './src/shared/infra/typeorm/migrations/*{.ts,.js}',
    ],

    options: {
        enableArithAbort: true,
        encrypt: true, // Habilita a criptografia (SSL/TLS)
        trustServerCertificate: true, // Permite confiar no certificado do servidor
        cryptoCredentialsDetails: tlsConfig, // Usa o agente TLS configurado acima
    },
});
