const authService = (userLogin) => {
  return userLogin.email === 'admin@mail.com' && userLogin.password === '12345' ? true : false;
};

export { authService };
