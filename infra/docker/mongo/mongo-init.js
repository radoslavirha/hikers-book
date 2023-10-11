db.createUser(
  {
      user: "hiker",
      pwd: "hikers_password",
      roles: [
          {
              role: "readWrite",
              db: "hikers-book"
          }
      ]
  }
);