# Firebase Firestore Setup Guide

Follow these steps to configure Firebase Firestore for your ManageApp.

## Step 1: Enable Firestore Database

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **manageapp-fa78c**
3. In the left sidebar, click on **"Build"** → **"Firestore Database"**
4. Click **"Create database"**
5. Choose **"Start in production mode"** (we'll set up rules next)
6. Select a Cloud Firestore location (choose the closest to your users)
7. Click **"Enable"**

## Step 2: Set Up Security Rules

1. In Firestore Database, click on the **"Rules"** tab
2. Replace the existing rules with these (allows read/write for everyone - suitable for this app):

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"**

⚠️ **Note:** These rules allow anyone to read/write data. For production apps with user authentication, you should restrict access. For this personal finance app, it's acceptable if you're the only user.

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. If you haven't added a web app yet:
   - Click the **web icon** `</>`
   - Register your app with a nickname (e.g., "ManageApp Web")
   - Click **"Register app"**
5. Copy the `firebaseConfig` object

## Step 4: Update Your Firebase Config

1. Open `src/firebase.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "manageapp-fa78c.firebaseapp.com",
  projectId: "manageapp-fa78c",
  storageBucket: "manageapp-fa78c.firebasestorage.app",
  messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID",
};
```

3. Save the file

## Step 5: Build and Deploy

```bash
npm run build
firebase deploy
```

## What Changed?

✅ Data is now stored in Firebase Firestore instead of browser localStorage
✅ Data syncs across all devices automatically
✅ Data persists even if you clear your browser
✅ Multiple users can access the same data (if you share the link)

## Testing

1. Open your app on your computer: https://manageapp-fa78c.web.app
2. Add some income/transfer entries
3. Open the same URL on your phone
4. You should see the same data!

## Collections Created

- `income` - Stores all income entries
- `transfers` - Stores all transfer entries

## Troubleshooting

**Error: "Permission denied"**

- Make sure you published the security rules in Step 2

**Error: "Firebase not configured"**

- Double-check that you updated `src/firebase.js` with your actual config values

**Data not syncing**

- Check your internet connection
- Open browser console (F12) to see any error messages
- Verify Firestore is enabled in Firebase Console

## Security Notes

If you want to make the app private (only you can access):

1. Enable Firebase Authentication
2. Update security rules to require authentication
3. Add login/signup functionality to the app

For now, anyone with the URL can access the data. If you need help adding authentication, let me know!
