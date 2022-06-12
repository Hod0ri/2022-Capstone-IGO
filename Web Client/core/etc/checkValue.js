export const checkValue = {
  user_Email: (value) =>
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
      value
    ),

  user_Phone: (value) =>
    /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(value),

  user_Name: (value) => /^[가-힣]{2,10}$/.test(value),

  user_Pw: (value) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
      value
    ),
  user_Id: (value) => /^[a-z]+[a-z0-9]{4,49}$/.test(value),

  user_Nick: (value) => /^[a-zA-Z가-힣]+[a-zA-Z가-힣0-9]{1,9}$/.test(value),
};
