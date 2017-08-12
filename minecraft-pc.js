
module.exports = {

  getTest: function () {
    return "hello";
  },

  downloadJarFile: function()
  {
    return "wget -O minecraft_server.jar https://s3.amazonaws.com/Minecraft.Download/versions/1.7.4/minecraft_server.1.7.4.jar";
  }

};
