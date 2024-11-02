import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
    // Method to get all users
    async getAllUsers() {
        return await prisma.user.findMany();
    }

    // Method to find a user by email
    async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email },
        });
    }

    // Method to create a new user
    async createUser(name: string, email: string) {
        return await prisma.user.create({
            data: { name, email },
        });
    }
}

export default UserService;
