import 'reflect-metadata';
import { AppDataSource } from "./dataSource";
import '@shared/container';


AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        // Iniciar o servidor ou outra lógica necessária
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
