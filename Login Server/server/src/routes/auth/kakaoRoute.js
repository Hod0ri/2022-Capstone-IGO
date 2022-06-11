const { default: axios } = require("axios");
const { Router } = require("express");
const jwt = require("jsonwebtoken");

const kakaoRouter = Router();
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.SECRET_JWT_KEY, (err, decoded) => {
    if (err) return false;
    return decoded.user_Id;
  });
};
kakaoRouter.get("/", async (req, res) => {
  const isJwt = verifyJwt(req.cookies.jwt);
  if (!isJwt) return res.status(404).json({ success: false, err: "잘못된 접근입니다." });
  const { origin, destination } = req.query;

  let errstate = false;
  let data = await axios
    .get(`https://apis-navi.kakaomobility.com/v1/directions?priority=RECOMMEND&car_type=1&car_fuel=GASOLINE&origin=${origin}&destination=${destination}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_FIND_REST_API_KEY}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
  if (!data) return res.status(400).send({ success: false, err: "data가 안넘어옴" });
  if (errstate) return res.status(400).send({ success: false, err: data });
  return res.status(200).send(data);
});

module.exports = { kakaoRouter };
