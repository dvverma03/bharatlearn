export const SignInFormValidation = (email, contact) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    email
  );
  const contactRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/.test(contact);
  if (!emailRegex) return "Email is not valid";
  if (!contactRegex) return "Contact is not valid";
  return null;
};
