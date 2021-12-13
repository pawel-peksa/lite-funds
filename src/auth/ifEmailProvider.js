export const ifEmailProvider = (user) => {
  return user.providerData[0].providerId === "password";
};
