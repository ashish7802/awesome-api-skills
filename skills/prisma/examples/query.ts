const user = await prisma.user.create({
  data: { email: 'alice@prisma.io', name: 'Alice' },
})