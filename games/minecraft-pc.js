//all the commands needed to run, stop, start, and more on a minecraft serverName

module.exports = {

  downloadJarFile: function(serverNumber) {
    //server number example: 1.7.4
    return "wget -O minecraft_server.jar https://s3.amazonaws.com/Minecraft.Download/versions/1.7.4/minecraft_server." + serverNumber + ".jar";
  },

  startScreen: function(serverName) {
    return "screen -S \"Minecraft server";
  },

  startServer: function(serverName, ramAmount) {
    return "screen -S " + serverName + " -p 1 -X stuff 'java -Xmx" + ramAmount + "M -Xms" + ramAmount + "M -jar minecraft_server.jar nogui'"
  },

  stopServer: function() {
    return "screen -S " + serverName + " -p 1 -X stuff " + "/stop"
  }
};
