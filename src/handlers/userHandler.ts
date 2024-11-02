import { FastifyRequest, FastifyReply } from 'fastify';
import UserService from '../service/userService';
import { generateResponse } from '../utils/responseUtil';
import { StatusCodes } from 'http-status-codes';

// Define the UserController class with dependency injection
class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    // Method to create a new user
    async createUser(request: FastifyRequest, reply: FastifyReply) {
        const { name, email } = request.body as { name: string; email: string };

        try {
            // Check if the user already exists using the service
            const existingUser = await this.userService.findUserByEmail(email);

            if (existingUser) {
                reply
                    .status(StatusCodes.CONFLICT)
                    .send(
                        generateResponse(
                            'error',
                            undefined,
                            'User with this email already exists',
                        ),
                    );
                return;
            }

            // Create the new user using the service
            const newUser = await this.userService.createUser(name, email);
            reply
                .status(StatusCodes.CREATED)
                .send(generateResponse('success', newUser));
        } catch (error) {
            reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(
                    generateResponse(
                        'error',
                        undefined,
                        'An error occurred while creating the user',
                    ),
                );
        }
    }

    // Method to get all users
    async getUsers(request: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await this.userService.getAllUsers();
            reply
                .status(StatusCodes.OK)
                .send(generateResponse('success', users));
        } catch (error) {
            reply
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(
                    generateResponse(
                        'error',
                        undefined,
                        'An error occurred while fetching users',
                    ),
                );
        }
    }
}

// Create an instance of UserController with UserService
const userController = new UserController(new UserService());

export default userController;
