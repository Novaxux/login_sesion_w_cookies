export const registerForm = () => {
  return `
    <form id="register">
        <label for="username">Username</label>
        <input type="text" name="username" />
        <label for="password">Password</label>
        <input type="text" name="password" />
        <label for="password">Confirm password</label>
        <input type="text" name="password" />
        <button type="submit">Send</button>
        <button type="button" id="closeDialog">Cancel</button>
    </form>`;
  };
