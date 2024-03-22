// import { PrismaClient } from "";
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
module.exports = db;
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
