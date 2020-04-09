require("dotenv").config();
const fetch = require("node-fetch");
const User = require("../models/User");
const client = require("twilio")(process.env.ACC_SID, process.env.AUTH_TOKEN);
const cron = require("node-cron");


const tasks = cron.schedule("30 10,23 * * *", () => {
  // get_users();
  // get_data();
  send_msg();
});

const send_msg = async () => {
  const users_num = await get_users();
  const cases_data = await get_data();

  // console.log(users_num);
  // console.log(cases_data);

  // Message For Gujarat Users
  const gj_msg = `Total Cases In India: ${cases_data.total_cases} \n Total Cases In Gujarat: ${cases_data.gj_total} \n New Cases In India: ${cases_data.total_new} \n New Cases In Gujarat: ${cases_data.gj_new} \n #StayHome #StaySafe`;

  // Message For Maharashtra Users
  const mh_msg = `Total Cases In India: ${cases_data.total_cases} \n Total Cases In Gujarat: ${cases_data.mh_total} \n New Cases In India: ${cases_data.total_new} \n New Cases In Gujarat: ${cases_data.mh_new} \n #StayHome #StaySafe`;

  // Sending Messages To Users In Gujarat
  users_num.GJ.forEach((user) => {
    console.log(user, gj_msg);
    client.messages
      .create({
        body: gj_msg,
        from: process.env.PHN_NUM,
        to: "+91" + user,
      })
      .then((msg) => console.log(msg.sid))
      .catch((err) => console.log(err));
  });

  // Sending Messages To Users In Maharashtra
  users_num.MH.forEach((user) => {
    // console.log(user, mh_msg);
    client.messages
      .create({
        body: mh_msg,
        from: process.env.PHN_NUM,
        to: "+91" + user,
      })
      .then((msg) => console.log(msg.sid))
      .catch((err) => console.log(err));
  });
};

const get_users = async () => {
  // Getting all the active users from the Database
  numbers = {};
  const active_users = await User.find({
    active: true,
  });

  // Getting an array of numbers of Active Users in Gujarat
  guj_users_num = active_users
    .filter((user) => user.state === "Gujarat")
    .map((user) => user.number);

  // Getting an array of numbers of Active Users in Gujarat
  mh_users_num = active_users
    .filter((user) => user.state === "Maharashtra")
    .map((user) => user.number);

  numbers.MH = mh_users_num;
  numbers.GJ = guj_users_num;
  // Logging out both arrays of numbers.
  // console.log(mh_users_num, guj_users_num);
  // console.log(numbers);
  return numbers;

  // console.log(active_users);
};

const get_data = async () => {
  cases = {};
  await fetch("https://api.covid19india.org/data.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data_array = data.statewise;
      total_obj = data_array.filter((data) => data.state === "Total")[0];
      gj_obj = data_array.filter((data) => data.state === "Gujarat")[0];
      mh_obj = data_array.filter((data) => data.state === "Maharashtra")[0];

      cases.total_cases = total_obj.confirmed;
      cases.total_new = total_obj.deltaconfirmed;
      cases.mh_total = mh_obj.confirmed;
      cases.mh_new = mh_obj.deltaconfirmed;
      cases.gj_total = gj_obj.confirmed;
      cases.gj_new = gj_obj.deltaconfirmed;
      // console.log(
      //   total_obj.confirmed,
      //   total_obj.deltaconfirmed,
      //   gj_obj.confirmed,
      //   gj_obj.deltaconfirmed,
      //   mh_obj.confirmed,
      //   mh_obj.deltaconfirmed
      // );
      // console.log(cases);
    })
    .then();
  return cases;
};

module.exports = {
  get_data,
  get_users,
  tasks,
  send_msg,
};
