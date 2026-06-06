import { prisma } from "../Prisma/prisma_client.mjs";
const createMenu = async (req, res) => {
  console.log(req.body);
  const menu = await prisma.Menu.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      Price_half: req.body.Price_half,
      Price_full: req.body.Price_full,
      created_by: res.user.id,
    },
  });
  res.json({ menu });
};
const getMenu = async (req, res) => {
  const page = parseInt(req.menu.page)
  const limit = parseInt(req.menu.limit)
  if(isNaN(page)||isNaN(limit)){
   return res.status(400).json({
      error:"pagination is not OK"
    })
  }
 const menu = await prisma.query.findMany({
  skip:(page - 1)*limit,
  take:limit,
 })
 res.json({menu})
};
const updateMenu = async (req, res) => {
  res.json({ message: "Update" });
};
const deleteMenu = async (req, res) => {
  res.json({ message: "delete" });
};
export { createMenu, getMenu, updateMenu, deleteMenu };
