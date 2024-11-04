import express from 'express';
import handlebars from 'express-handlebars';
import initSocket from './socket.js';

import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import config from './config.js';


const app = express();

const httpServer = app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
    
    const socketServer = initSocket(httpServer);
    app.set('socketServer', socketServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/views', viewsRouter);
    app.use('/api/users', usersRouter);
    app.use('/static', express.static(`${config.DIRNAME}/public`));
});