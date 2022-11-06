class Define {
  static page = {
    admin: "admin",
    confluence: "confluence",
    emLauncher: "emLauncher",
    jenkins: "jenkins",
    moive: "movie",
    redmine: "redmine",
  };

  static getEnableKey(name) {
    return "enable_" + name;
  }
}
