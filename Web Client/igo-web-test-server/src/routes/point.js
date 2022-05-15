const { Router } = require("express");
const pointRouter = Router();
pointRouter.post("/", async (req, res) => {
  const { pot_Date, pot_Change, pot_Reaseon } = req.body;

  if (!pot_Date) return res.status(400).send({ success: false, err: "pot_Date is required" });
  if (!pot_Change) return res.status(400).send({ success: false, err: "pot_Change is required" });
  if (!pot_Reaseon) return res.status(400).send({ success: false, err: "pot_Reaseon is required" });

  return res.status(201).send({ success: true, result: pot_Reaseon });
});

pointRouter.get("/", async (req, res) => {
  return res.status(201).send({
    success: true,
    result: [
      {
        pot_Date: `2022-01-01 00:00:00`,
        pot_Change: 3000,
        pot_Reaseon: "충전",
        pot_Amount: 6000,
      },
      {
        pot_Date: `2022-01-02 00:00:00`,
        pot_Change: 1000,
        pot_Reaseon: "충전",
        pot_Amount: 7000,
      },
      {
        pot_Date: `2022-01-03 00:00:00`,
        pot_Change: 2000,
        pot_Reaseon: "사용",
        pot_Amount: 5000,
      },
      {
        pot_Date: `2022-01-04 00:00:00`,
        pot_Change: 3000,
        pot_Reaseon: "충전",
        pot_Amount: 8000,
      },
    ],
  });
});
module.exports = { pointRouter };
