const { placeBet } = require("../controllers/BetsController");
const { stkpush } = require("../controllers/mpesa_c2b");
const Player = require("../models/Player");
const jwt = require("jsonwebtoken");


//connection definition
const connection = async (io, socket) => {
  // on connection function
  const onlineUsers = socket.conn.server.clientsCount;

  socket.emit("users_online", onlineUsers);
  socket.on("disconnection", () => {
    socket.emit("users_onlne", onlineUsers);
  });

  socket.on("player_login", async (callback) => {
    if (!socket.isAuth) {
      return callback({ user: null, isAuth: socket.isAuth });
    }
    const user = await Player.findById(socket.user.id)
      .populate("account")
      .populate("bets");
    return callback({ user: user, isAuth: socket.isAuth });
  });
  // check auth token
  // authorize(socket);
  // socket play
  socket.on("bet_place", async (data, callback) => {
    if (!socket.isAuth) {
      return callback({ status: "unauthorized" });
    }
    await Player.findById(socket.user.id)
      .populate("account").then(async (player) => {
        // handle betting
        console.log(player)
        await placeBet(data.box, player).then((result) => {
          if (result.message === "win") {
            io.emit("box_winner", result);
          }
          return callback(result)
        })

      });

  });

  socket.on("transaction_deposit", async (data, callback) => {
    if (!socket.isAuth) {
      return callback({ status: "unauthorized" });
    }

    if (data.amount <= 50) {
      return callback({
        status: "error",
        message: "Failed. Invalid Amount",
      });
    }
    Player.findById(socket.user.id)
      .populate("account")
      .then((player) => {
        const xDeposit = stkpush(data.amount, player).then((result) => {
          setTimeout(() => {
            console.log(" res", result);
          }, 1000);
          // TO DO :  handle -- return response from stk call
          return callback({
            status: "success",
            message: "Check your phone and enter pin",
          });
        });
      });
  })
};

module.exports = { connection };
