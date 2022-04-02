const moment = require("moment");
const validation = require("../../utils/validation");
const db = require("../../config");
const targetRef = db.collection("Target");

const createTarget = async (req, res, next) => {
  let responsed = false;
  try {
    if (req.method != "POST") {
      res.status(406).send("Forbidden");
      return;
    }

    let userId = req.body.userId || null;
    if (!validation.id(userId, false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10010,
          mgResp: "Invalid userId",
        })
      );
      res.end();
      return;
    }

    let targetName = req.body.targetName || null;
    if (!validation.string(targetName, 1, 256, false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10005,
          msResp: "Invalid target name",
        })
      );
      res.end();
      return;
    }

    let targetDuration = req.body.targetDuration || null;
    if (!validation.string(targetDuration,1,100,false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10006,
          msResp: "Invalid duration",
        })
      );
      res.end();
      return;
    }

    let targetTasks = req.body.targetTasks || null;
    if (!validation.array(targetTasks, 1, 256)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 1007,
          mgResp: "Invalid tasks",
        })
      );
      res.end();
      return;
    }

    if (targetTasks) {
      let targetTaskItem = req.body.targetTasks.forEach((task) => {
        if (!validation.string(task.taskName,1,256,false)) {
          res.writeHead(400, {});
          res.write(
            JSON.stringify({
              msgCode: 1008,
              msgRsp: "Invalid task name",
            })
          );
          res.end();
          return;
        }

        if (!validation.int(task.point, 1, 4, false)) {
          res.writeHead(400, {});
          res.write(
            JSON.stringify({
              msgCode: 1009,
              mgResp: "Invalid point",
            })
          );
          res.end();
          return;
        }
      });
    }

    let doc = {
      userId:userId,
      targetName:targetName,
      targetDuration:targetDuration,
      targetTasks:targetTasks,
      createdAt: moment().unix(),
      updateTargetCount: 0,
    };

    try {
      await targetRef.add(doc);
      res.status(200);
      res.send({ mgResp: "success" });
    } catch (error) {
      console.log(error)  
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10011,
          msgResp: "Can't create target",
        })
      );
      res.end();
      return;
    }

    responsed = true;
  } catch (error) {
      console.log(error)
    if (!responsed) {
        res.writeHead(400, {});
        res.write(JSON.stringify({
          msgCode: 10091,
          msgResp: 'Unknown'
        }));
        res.end();
    }
  }
};

module.exports = createTarget;
