import Fastify from 'fastify';
import userController from './handlers/userHandler';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000; // Convert PORT to a number
const fastify = Fastify({ logger: true });

// Route to get all users
fastify.get('/users', userController.getUsers.bind(userController));

// Route to post a new user
fastify.post('/users', userController.createUser.bind(userController));

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

// Handle the promise
start().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
