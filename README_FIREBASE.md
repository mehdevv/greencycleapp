# Firebase Authentication Setup Guide

This app uses Firebase Authentication with role-based access control. Each user can only login with their assigned role.

## Setup Instructions

### 1. Install Firebase

```bash
npm install firebase
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to **Authentication** > **Sign-in method**
   - Enable **Email/Password** provider
4. Enable Firestore:
   - Go to **Firestore Database**
   - Click **Create database**
   - Start in **test mode** (you can secure it later)
   - Choose a location

### 3. Get Your Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click the **Web** icon (`</>`)
4. Register your app (if not already done)
5. Copy the Firebase configuration object

### 4. Update Firebase Config

Open `src/config/firebase.js` and replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5. Set Up Firestore Security Rules

In Firebase Console > Firestore Database > Rules, add these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      // Only authenticated users can write their own data
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## How Role-Based Authentication Works

1. **User Registration**: When a user signs up, their role is stored in Firestore under `users/{userId}` with a `role` field (`customer`, `superette`, or `recycler`).

2. **Login Validation**: When a user tries to login:
   - They select their role type (Customer, Superette, or Recycler)
   - The app authenticates with Firebase
   - The app checks the user's role in Firestore
   - If the role matches the selected type, login succeeds
   - If the role doesn't match, the user is signed out and shown an error

3. **Role Enforcement**: Users cannot login to a different role unless they create a separate account with that role.

## Creating Test Users

### Option 1: Through the App (Sign Up)

You'll need to create a sign-up form or use Firebase Console to create users and assign roles.

### Option 2: Through Firebase Console

1. Go to **Authentication** > **Users**
2. Click **Add user**
3. Enter email and password
4. After creating the user, go to **Firestore Database**
5. Create a document in `users` collection with the user's UID
6. Add a field `role` with value: `customer`, `superette`, or `recycler`

Example Firestore document:
```
Collection: users
Document ID: {user-uid}
Fields:
  - email: "user@example.com"
  - role: "customer"
  - createdAt: [timestamp]
```

## Testing

1. Create a test user in Firebase Console
2. Add their role in Firestore
3. Try logging in with the correct role - should succeed
4. Try logging in with a different role - should fail with error message

## Error Messages

- **"This account is registered as {role}. Please login with the correct account type."** - User tried to login with wrong role
- **"User account not properly configured. Please contact support."** - User doesn't have a role assigned
- **"No account found with this email."** - Email doesn't exist
- **"Incorrect password."** - Wrong password

## Next Steps

- Add a sign-up form for new users
- Add password reset functionality
- Add user profile management
- Add protected routes based on roles
- Add role-based dashboard redirects

