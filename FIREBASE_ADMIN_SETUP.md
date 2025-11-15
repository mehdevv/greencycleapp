# Firebase Admin Account Setup Guide

This guide explains what you need to configure in Firebase for the admin account to work properly.

## 1. Firebase Authentication Setup

### Enable Email/Password Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **greencan-a0782**
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** provider if not already enabled
5. Click **Save**

### Admin Account Creation

The admin account will be **automatically created** when you first log in at `/admin/login` with:
- **Email**: `admin@greencycle.com`
- **Password**: `mehdi123`

**OR** you can manually create it:

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter:
   - Email: `admin@greencycle.com`
   - Password: `mehdi123`
4. Click **Add user**

## 2. Firestore Database Setup

### Create the `users` Collection

The `users` collection will be created automatically when users sign up. However, you need to ensure proper security rules.

### Firestore Security Rules

Go to **Firestore Database** → **Rules** and update them to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to get user role
    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }
    
    // Helper function to check if user is admin
    function isAdmin() {
      return isAuthenticated() && getUserRole() == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      
      // Users can create their own document during signup
      allow create: if isAuthenticated() && request.auth.uid == userId;
      
      // Users can update their own data (except role and approval status)
      allow update: if isAuthenticated() && (
        // User updating their own data (but not role or approval fields)
        (request.auth.uid == userId && 
         !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'approved', 'rejected', 'approvedBy', 'rejectedBy', 'approvedAt', 'rejectedAt'])) ||
        // Admin can update any user data
        isAdmin()
      );
      
      // Only admins can delete users
      allow delete: if isAdmin();
    }
    
    // Allow admins to query all users
    match /users/{userId} {
      allow list: if isAdmin();
    }
    
    // Default: deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Important Notes:

1. **Admin Role**: The admin account must have `role: 'admin'` in the Firestore `users` collection
2. **Admin Approval**: The admin account should have `approved: true` and `isAdmin: true` set automatically
3. **User Approval**: Superettes and Recyclers will have `approved: false` by default until you approve them

## 3. Verify Admin Account Setup

After logging in for the first time, verify the admin account in Firestore:

1. Go to **Firestore Database** → **Data**
2. Navigate to the `users` collection
3. Find the document with email `admin@greencycle.com`
4. Verify it has:
   ```json
   {
     "email": "admin@greencycle.com",
     "role": "admin",
     "approved": true,
     "isAdmin": true,
     "createdAt": "[timestamp]"
   }
   ```

## 4. Testing the Admin Dashboard

1. Navigate to `/admin/login` in your app
2. Log in with:
   - Email: `admin@greencycle.com`
   - Password: `mehdi123`
3. You should be redirected to `/admin` dashboard
4. You should see tabs for:
   - **Superettes**: Pending superette registrations
   - **Recyclers**: Pending recycler registrations
   - **Recycling Points**: (Coming soon)

## 5. Troubleshooting

### Issue: "Permission denied" when accessing admin dashboard

**Solution**: Check Firestore security rules. Make sure:
- The admin user has `role: 'admin'` in Firestore
- The security rules allow admins to read/write user documents

### Issue: Admin account not created automatically

**Solution**: 
1. Check Firebase Authentication is enabled
2. Manually create the user in Authentication
3. Manually create the document in Firestore with the correct role

### Issue: Cannot see pending superettes/recyclers

**Solution**: 
- Check that superettes/recyclers have signed up (they should have `approved: false` or no `approved` field)
- Verify Firestore security rules allow admins to query the `users` collection
- Check browser console for any error messages

## 6. Security Best Practices

1. **Keep admin credentials secure**: Only you should know the admin login URL and credentials
2. **Regular security audits**: Review Firestore security rules periodically
3. **Monitor admin actions**: Consider adding logging for admin approval/rejection actions
4. **Change default password**: Consider changing the admin password after first login

## 7. Manual Admin Account Creation (Alternative)

If automatic creation doesn't work, you can manually set up the admin account:

### Step 1: Create Authentication User
1. Go to **Authentication** → **Users** → **Add user**
2. Email: `admin@greencycle.com`
3. Password: `mehdi123`
4. Copy the **User UID**

### Step 2: Create Firestore Document
1. Go to **Firestore Database** → **Data**
2. Click **Start collection** (if `users` doesn't exist)
3. Collection ID: `users`
4. Document ID: [Paste the User UID from Step 1]
5. Add fields:
   - `email` (string): `admin@greencycle.com`
   - `role` (string): `admin`
   - `approved` (boolean): `true`
   - `isAdmin` (boolean): `true`
   - `createdAt` (timestamp): [Current timestamp]

## Summary

**Minimum Required Setup:**
1. ✅ Enable Email/Password authentication in Firebase
2. ✅ Set up Firestore security rules (copy the rules above)
3. ✅ Log in at `/admin/login` (account will be created automatically)
4. ✅ Verify admin document exists in Firestore with `role: 'admin'`

That's it! The admin dashboard should work after these steps.

