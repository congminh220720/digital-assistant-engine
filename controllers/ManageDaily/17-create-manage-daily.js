const moment = require("moment");
const db = require("../../config");
const validation = require("../../utils/validation");
const dailyTasksRef = db.collection("Task__daily");

const createManageDaily = async (req, res,next) => {
  let responsed = false;
  try {
    if (req.method != "POST") {
      res.status(403).send("Forbidden");
      return;
    }

    let date = req.body.date || null;
    if (!validation.string(date, 1, 256, false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10016,
          msgResp: "Invalid date ",
        })
      );
      res.end();
      return;
    }

    let dailyTasks = req.body.tasks || null;
    if (!validation.array(dailyTasks, 1, 1000)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10015,
          msgResp: "Invalid tasks",
        })
      );
      res.end();
      return;
    }

    if (dailyTasks) {
      dailyTasks.forEach((task) => {
        if (!validation.string(task.taskName, 1, 256, false)) {
          res.writeHead(400, {});
          res.write(
            JSON.stringify({
              msgCode: 10016,
              msgResp: "Invalid task name",
            })
          );
          res.end();
          return;
        }

        if (!validation.string(task.startTime, 1, 256, false)) {
          res.writeHead(400, {});
          res.write(
            JSON.string({
              msgCode: 10017,
              msgResp: "Invalid time",
            })
          );
          res.end();
          return;
        }

        if (!validation.int(task.status, 1, 4, false)) {
          res.writeHead(400, {});
          res.write(
            JSON.stringify({
              msgCode: 10018,
              mgResp: "Invalid status",
            })
          );
          res.end();
          return;
        }
      });
    }

    let userId = req.body.userId || null;
    if (!validation.id(userId, false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10019,
          mgResp: "Invalid userId",
        })
      );
      res.end();
      return;
    }

    let doc = {
      userId:userId,
      date:date,
      dailyTasks:dailyTasks,
      createdAt: moment().unix(),
      lastModifiedAt: 0,
    };

    try {
      await db.collection("Task__daily").add(doc);
      res.status(200);
      res.send({ msgResp: "Success" });
    } catch (e) {
      console.log(e);
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10020,
          msgResp: "can't create task daily",
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

module.exports = createManageDaily;
