import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCS9N9Zb16aW1SIvxCIOQ7KMHsQGtYVQAI',
  authDomain: 'capstone-project-3eec6.firebaseapp.com',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInWithEmailAndPassword(auth, 'test@medapi.com', 'Test1234!')
  .then((userCredential) => {
    return userCredential.user.getIdToken();
  })
  .then((token) => {
    console.log('Firebase Token:', token);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
