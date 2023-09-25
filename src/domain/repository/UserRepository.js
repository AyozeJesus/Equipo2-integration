export class UserRepository {
  // eslint-disable-next-line no-unused-vars
  save(user) {
    throw new Error("This is an abstract class. You should implement the save method")
  }

  // eslint-disable-next-line no-unused-vars
  findById(id) {
    throw new Error("This is an abstract class. You should implement the findById method")
  }

  // eslint-disable-next-line no-unused-vars
  existsByEmail(email) {
    throw new Error("This is an abstract class. You should implement the existsByEmail method")
  }
}
