async function link(parent, args, context) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).link();
}

async function user(parent, args, context) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user();
}

module.exports = {
  link,
  user,
};
