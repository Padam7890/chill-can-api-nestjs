import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Define the permissions
  const permissions = ['read', 'write', 'update', 'delete'];

  // Create permissions
  const permissionRecords = await Promise.all(
    permissions.map(async (perm) => {
      return prisma.permission.upsert({
        where: { name: perm },
        update: {}, // If it already exists, do nothing
        create: {
          name: perm,
        },
      });
    })
  );

  console.log('Permissions created: ', permissionRecords);

  // Create roles
  const roles = ['ADMIN', 'USER'];

  const roleRecords = await Promise.all(
    roles.map(async (role:any) => {
      return prisma.role.upsert({
        where: { name: role },
        update: {},
        create: {
          name: role,
        },
      });
    })
  );

  console.log('Roles created: ', roleRecords);

  // Assign all permissions to ADMIN role
  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });

  if (adminRole) {
    await Promise.all(
      permissionRecords.map(async (permission) => {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: adminRole.id,
              permissionId: permission.id,
            },
          },
          update: {}, // If the relation exists, do nothing
          create: {
            roleId: adminRole.id,
            permissionId: permission.id,
          },
        });
      })
    );
    console.log('Assigned all permissions to ADMIN role');
  }

  // Assign read and write permissions to USER role
  const userRole = await prisma.role.findUnique({ where: { name: 'USER' } });

  if (userRole) {
    const userPermissions = permissionRecords.filter((p) =>
      ['read', 'write'].includes(p.name)
    );

    await Promise.all(
      userPermissions.map(async (permission) => {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: userRole.id,
              permissionId: permission.id,
            },
          },
          update: {}, // If the relation exists, do nothing
          create: {
            roleId: userRole.id,
            permissionId: permission.id,
          },
        });
      })
    );
    console.log('Assigned read and write permissions to USER role');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
