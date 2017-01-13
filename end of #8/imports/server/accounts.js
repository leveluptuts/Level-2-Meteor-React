Accounts.onCreateUser((options, user) => {
  console.log(options, user);

  user.hair = 'brown';

  return user;
});
