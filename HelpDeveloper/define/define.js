class Define {
  static page = {
    admin: "admin",
    jenkins: "jenkins",
    redmine: "redmine",
    emLauncher: "emLauncher",
  };

  static getEnableKey(name) {
    return "enable_" + name;
  }
}
