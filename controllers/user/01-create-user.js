const db = require("../../config");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const md5 = require("md5");
const validation = require("../../utils/validation");
const userRef = db.collection("Users");

const createUser = async (req, res, next) => {
  let responsed = false;
  try {
    if (req.method != "POST") {
      res.status(403).send("Forbidden");
      return;
    }

    let email = req.body.email || null;
    if (!validation.email(email, false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10000,
          msgResp: "Invalid email",
        })
      );
      res.end();
      return;
    }

    let name = req.body.name || null;
    if (!validation.string(name, 1, 256, false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10001,
          msgResp: "Name is mandatory",
        })
      );
      res.end();
      return;
    }

    let password = req.body.password || null;
    if (password) {
      if (!validation.string(password, 4, 64, false)) {
        res.writeHead(400, {});
        res.write(
          JSON.stringify({
            msgCode: 10002,
            msgResp: "Invalid password",
          })
        );
        res.end();
        return;
      }
    }

    let photoUrl = req.body.photoUrl || null;
    if (!validation.url(photoUrl, true)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10003,
          msgResp: "Invalid photo url",
        })
      );
      res.end();
      return;
    }
    var snap = await userRef.where("email", "==", email).get();
    if (snap.size > 0) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10004,
          msgResp: "Email is taken",
        })
      );
      res.end();
      return;
    }

    let doc = {
      email: email,
      password: password ? md5(password) : null,
      name: name,
      photoUrl: photoUrl,
      createdAt: moment().unix(),
      lastModifiedAt: 0,
      loginTryCount: 0,
      loginLockedTime: 0,
      codeToResetPassword: 0,
      resetPasswordRequestTime: 0,
    };

    try {
      let added = await db.collection("Users").add(doc);
      doc.id = added.id;
    } catch (e) {
      console.log(e);
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10005,
          msgResp: "Can't add user",
        })
      );
      res.end();
      return;
    }

    const privkey = process.env.JWT_ACCESS_TOKEN;
    const payload = {
      email: email,
      name: name,
      uid: doc.id,
      photoUrl: photoUrl,
      createdAt: moment().unix(),
    };
    const token = jwt.sign(payload, privkey, {
      expiresIn: process.env.JWT_TOKEN_PERIOD,
    });
    console.log(token);
    res.writeHead(201, {});
    res.write(
      JSON.stringify({
        msgCode: 10006,
        msgResp: {
          token: token,
        },
      })
    );
    res.end();

    console.log(1);
    responsed = true;
  } catch (error) {
    if (!responsed) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10090,
          msgResp: "Unknown",
        })
      );
      res.end();
    }
  }
};

module.exports = createUser;
