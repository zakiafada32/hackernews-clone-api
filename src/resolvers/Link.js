async function postedBy(parent, args, context, info) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

async function votes(parent, args, context, info) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
}

module.exports = {
  postedBy,
  votes,
};
