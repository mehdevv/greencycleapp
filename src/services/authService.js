import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// User roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  SUPERETTE: 'superette',
  RECYCLER: 'recycler',
  ADMIN: 'admin',
};

/**
 * Get user role from Firestore
 */
export const getUserRole = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    console.error('Error getting user role:', error);
    throw error;
  }
};

/**
 * Set user role in Firestore
 */
export const setUserRole = async (userId, role, additionalData = {}) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(
      userRef,
      {
        role,
        ...additionalData,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
};

/**
 * Create user account with role
 */
export const signUpWithRole = async (email, password, role, additionalData = {}) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user role and additional data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role,
      createdAt: serverTimestamp(),
      ...additionalData,
    });

    return { user, role };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Sign in with email and password, validating role
 */
export const signInWithRole = async (email, password, expectedRole) => {
  try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user role from Firestore
    const userRole = await getUserRole(user.uid);

    if (!userRole) {
      // If user doesn't have a role, sign them out and throw error
      await signOut(auth);
      throw new Error('User account not properly configured. Please contact support.');
    }

    // Validate that the user's role matches the expected role
    if (userRole !== expectedRole) {
      // Sign out the user if role doesn't match
      await signOut(auth);
      throw new Error(
        `This account is registered as a ${userRole}. Please login with the correct account type.`
      );
    }

    return { user, role: userRole };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Sign out current user
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get current authenticated user with role
 */
export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const role = await getUserRole(user.uid);
    return { user, role };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Get user data from Firestore
 */
export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const role = await getUserRole(user.uid);
        const userData = await getUserData(user.uid);
        callback({ 
          user, 
          role,
          approved: userData?.approved || false,
          userData: userData
        });
      } catch (error) {
        console.error('Error getting user role:', error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

