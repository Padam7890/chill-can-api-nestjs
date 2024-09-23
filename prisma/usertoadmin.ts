import { PrismaClient, roles } from '@prisma/client'; // 'roles' should be the correct enum type from your schema

const prisma = new PrismaClient();

async function userToAdmin(userId: number) {
  // Find the user first
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // Check if user exists
  if (!user) {
    throw new Error('User not found');
  }

  // Update the user role to ADMIN
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: {
        connect: {
          name: roles.ADMIN,
        },
      },
    },
  });
  console.log('User updated to admin');
  return updatedUser;
}

async function main() {
  await userToAdmin(5);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
