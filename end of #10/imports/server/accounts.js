Accounts.onCreateUser((options, user) => {
  if(options.email === 'scott.tolinski@gmail.com') {
    user.roles = ['admin'];
  }
  return user;
});
