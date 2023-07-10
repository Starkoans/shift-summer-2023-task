import { useState } from 'react';

import styles from './Profile.module.css';

function Profile() {
  const [username, setUsername] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeProfile = e => {
    e.preventDefault();
  };
  return (
    <div className={styles.profile}>
      <h2>Личная информация</h2>
      <form
        onSubmit={e => {
          handleChangeProfile(e);
        }}
        className={styles.profileForm}
      >
        <section>
          <label>ФИО</label>
          <input
            onChange={e => setUsername(e.target.value)}
            type={'text'}
            value={username}
          />
        </section>
        <section>
          <label>Номер телефона</label>
          <input
            onChange={e => setPhoneNum(e.target.value)}
            type={'text'}
            value={phoneNum}
          />
        </section>
        <section>
          <label>E-mail</label>
          <input
            onChange={e => setEmail(e.target.value)}
            type={'text'}
            value={email}
          />
        </section>
        <button type={'submit'}>Обновить</button>
      </form>
    </div>
  );
}
export default Profile;
