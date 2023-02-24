export interface User {
  _id: string,
  username: string,
  accessToken: string,
  fullname?: string,
  userpic?: string,
}

export interface Credentials {
  username: string,
  password: string
}