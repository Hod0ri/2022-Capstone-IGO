const { Router } = require("express");
const issueRouter = Router();
issueRouter.post("/", async (req, res) => {
  const { ns_Target, ns_Reason, ns_Etc } = req.body;

  if (!ns_Target) return res.status(400).send({ success: false, err: "ns_Target is required" });
  if (!ns_Reason) return res.status(400).send({ success: false, err: "ns_Reason is required" });
  if (!ns_Etc && ns_Etc !== "") return res.status(400).send({ success: false, err: "ns_Etc is required" });

  return res.status(201).send({ success: true });
});

issueRouter.get("/", async (req, res) => {
  return res.status(201).send({
    success: true,
    result: [
      {
        ns_Date: `2022-01-01 00:00:00`,
        ns_Target: `user1`,
        ns_Reason: "노쇼",
        ns_Etc: "",
        ns_Status: "접수 대기",
      },
      {
        ns_Date: `2022-01-02 00:00:00`,
        ns_Target: `user1`,
        ns_Reason: "먹튀",
        ns_Etc: "",
        ns_Status: "접수 대기",
      },
      {
        ns_Date: `2022-01-03 00:00:00`,
        ns_Target: `user3`,
        ns_Reason: "잠수",
        ns_Etc: "",
        ns_Status: "접수 완료",
      },
      {
        ns_Date: `2022-01-04 00:00:00`,
        ns_Target: `user1`,
        ns_Reason: "노쇼",
        ns_Etc: "",
        ns_Status: "접수 대기",
      },
    ],
  });
});
module.exports = { issueRouter };
