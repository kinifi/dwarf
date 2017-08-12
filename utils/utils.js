
module.exports = {

  update: function () {
    return "sudo apt-get update";
  },

  installJava: function () {
    return "sudo apt-get install default-jdk";
  },

  installScreen: function() {
    return "sudo apt-get install screen";
  },

  //generate a unique ID
  guid: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

};
