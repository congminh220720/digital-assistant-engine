const db = require("../../config");

const userRef = db.collection("Users");

const getUser = async (req, res) => {
  try {
    let userData = [];
    let snap = await userRef.get();
    for (let i = 0; i < snap.size; i++) {
      var user = snap.docs[i].data();
      user.id = snap.docs[i].id;
      delete user.password;

      userData.push(user);
    }
    res.writeHead(200, {});
    res.write(
      JSON.stringify({
        msgCode: 10300,
        msgResp: userData,
      })
    );
    res.end();
  } catch (error) {}
};

module.exports = getUser;
