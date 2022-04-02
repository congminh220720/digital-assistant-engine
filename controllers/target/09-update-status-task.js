const db = require("../../config");
const validation = require("../../utils/validation");
const moment = require("moment");
const targetRef = db.collection("Target");

const updateStatus = async (req, res, next) => {
  let responsed = false;
  try {
    if (req.method != "PATCH") {
      res.status(403).send("Forbidden");
      return;
    }

    let idTarget = req.body.idTarget || null;
    if (!validation.string(idTarget, 1, 256, false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 1013,
          msgResp: "Invalid id",
        })
      );
      res.end();
      return;
    }

    let idTask = req.body.idTask || null;
    if (!validation.string(idTask, 1, 256, false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 1013,
          msgResp: "Invalid Task id",
        })
      );
      res.end();
      return;
    }

    let statusTask = req.body.status || null;
    if (!validation.int(statusTask, 1, 256, false)) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 1014,
          msgResp: "Invalid status",
        })
      );
      res.end();
      return;
    }

    try {
      const getTargetById = targetRef.doc(idTarget);
      const getTargetData = await getTargetById.get();
      if (!getTargetData.exists) {
        res.writeHead(400, {});
        res.write(
          JSON.stringify({
            msgCode: 10202,
            msgResp: "Target not found",
          })
        );
        res.end();
        return;
      }
      let targetData = getTargetData.data();

      let update = {};
      if (targetData.updateTargetCount)
        update.updateTargetCount = targetData.updateTargetCount;
      if (targetData.targetName) update.targetName = targetData.targetName;
      if (targetData.userId) update.userId = targetData.userId;
      if (targetData.targetDuration)
        update.targetDuration = targetData.targetDuration;
      if (targetData.createdAt) update.createdAt = targetData.createdAt;
      if (targetData.targetTasks) update.targetTasks = [];
      if (targetData.targetTasks) {
        console.log(targetData.targetTasks)

        targetData.targetTasks.forEach(task => {
          if(task.id === idTask){
            task.status = statusTask
            update.targetTasks.push(task)
            
          }else{
            update.targetTasks.push(task)
          }
        });
        if (Object.keys(update).length > 0) {
          try {
            const adc = targetRef.doc(idTarget);
            await adc.update(update);
            res.status(200);
            res.send({ msgResp: "success" });
          } catch (error) {
            console.log(e);
            res.writeHead(400, {});
            res.write(
              JSON.stringify({
                msgCode: 10014,
                msgResp: "Can't update status task",
              })
            );
            res.end();
            return;
          }
        }
      }
    } catch (error) {}
    responsed = true 

  } catch (error) {
    if (!responsed) {
      res.writeHead(400, {});
      res.write(
        JSON.stringify({
          msgCode: 10092,
          msgResp: "Unknown",
        })
      );
      res.end();
    }
  }
};

module.exports = updateStatus;
