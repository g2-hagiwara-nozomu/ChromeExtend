class Define {
  static page = {
    admin: "admin",
    jenkins: "jenkins",
    redmine: "redmine",
    emLauncher: "emLauncher",
    confluence: "confluence",
  };

  static getEnableKey(name) {
    return "enable_" + name;
  }
}
