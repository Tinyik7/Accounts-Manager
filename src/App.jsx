import useAccountStore from "./store/useAccountStore";
import { useState } from "react";
import "./reset.css"
import "./styles/account_manager.css"

const App = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
  const numbers = '1234567890';
  const symbols = '!@#$%^&*()_+{}[]|:;<>,.?/~';
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  let generatedPassword = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    generatedPassword += chars[randomIndex];
  }
  setPassword(generatedPassword);
  };

  const [newAccount, setNewAccount] = useState("");
  function onNewAccountChange(event) {
    setNewAccount(event.target.value);
  }

  const [newPlatform, setNewPlatform] = useState("");
  function onNewPlatformChange(event) {
    setNewPlatform(event.target.value);
  }
  
  const [newPassword, setNewPassword] = useState("");
  function onNewPasswordChange(event) {
    setNewPassword(event.target.value);
  }

  const {
    accounts,
    addAccount,
    removeAccount,
    editAccount,
    editPassword,
    editPlatform,
  } = useAccountStore();

  function handleCreateAccount(event) {
    event.preventDefault();
    addAccount(newAccount, newPassword, newPlatform);
    setNewAccount("");
    setNewPassword("");
    setNewPlatform("");
  }

  function handleRemoveAccount(accountId) {
    removeAccount(accountId)
  }

  function handleEditAccount(accountId) {
    const newText = prompt("Enter new text");
    if (newText) {
      editAccount(accountId, newText);
    }
  }

  function handleEditAccountPassword(accountId) {
    const newText = prompt("Enter new text");
    if (newText) {
      editPassword(accountId, newText);
    }
  }

  function handleEditAccountPlatform(accountId) {
    const newText = prompt("Enter new text");
    if (newText) {
      editPlatform(accountId, newText);
    }
  }

  return(
    <div className="add__account">
      <form className="account__input--info">
        <input className="login"
          type="text" 
          placeholder="логин"
          value={newAccount}
          onChange={onNewAccountChange}
        />
        <input className="password"
          type="password" 
          placeholder="пароль"
          value={newPassword}
          onChange={onNewPasswordChange}
        />
        <input className="platform"
          type="platform" 
          placeholder="платформа"
          value={newPlatform}
          onChange={onNewPlatformChange}
        />
        <button className="add__account--button" onClick={handleCreateAccount}>add account</button>
      </form>
      <ul className="account__list">
        {accounts.map((account) => (
          <li key={account.id} className="account__item">
            <p>{account.text} <button className="edit__login--button" onClick={(event) => handleEditAccount(account.id)}>edit login</button> </p> 
            <p>{account.password} <input className="password__generator" type="text" readOnly value={password}/> 
            <button className="edit__password--button" onClick={generatePassword}>Generate Password</button> <button className="edit__login--button" onClick={(event) => handleEditAccountPassword(account.id)}>edit password</button> </p> 
            <p>{account.platform} <button className="edit__platform--button" onClick={(event) => handleEditAccountPlatform(account.id)}>edit platform</button> </p>
            <button className="remove__account--button" onClick={(event) => handleRemoveAccount(account.id)}>remove account</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
