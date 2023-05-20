// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


jest.mock('firebase/auth', () => {
  return {
     // @ts-ignore
    Auth: 'Mocked Auth',
    signInWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    signOut: jest.fn(),
    sendEmailVerification: jest.fn(),
    updateProfile: jest.fn(),
    getAuth: jest.fn(),
    inMemoryPersistence: jest.fn(),
    initializeAuth: jest.fn(),
    setPersistence: jest.fn(),
     // @ts-ignore
    GoogleAuthProvider: class {
      addScope = jest.fn();
    }
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('firebase/firestore', () => {
  return {
    getFirestore: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    doc: jest.fn(),
  };
});

jest.mock('firebase/storage', () => {
  return {
    getStorage: jest.fn(),
    ref: jest.fn(),
    uploadString: jest.fn(),
    getDownloadURL: jest.fn(),
  };
});


jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn()
  }
})
jest.mock('firebase/auth/react-native', () => {
  return {
    getReactNativePersistence: jest.fn()
  }
})

import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);