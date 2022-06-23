export const host = process.env.REACT_APP_HOST;
export const registerRouter = `${host}/api/auth/register`;
export const loginRouter = `${host}/api/auth/login`;
export const avatarRouter = `${host}/api/auth/setAvatar`;
export const getUsersRouter = `${host}/api/auth/getUsers`;
export const sendMsgRouter = `${host}/api/message/sendMessage`;
export const receivedMsgRouter = `${host}/api/message/receivedMessage`;
