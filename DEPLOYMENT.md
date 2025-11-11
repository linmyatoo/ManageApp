# Firebase Deployment Guide for ManageApp

This guide will help you deploy your ManageApp to Firebase Hosting.

## Prerequisites

1. A Google account
2. Node.js and npm installed on your computer

## Step-by-Step Deployment Instructions

### 1. Install Firebase CLI

Open your terminal and run:

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

This will open a browser window where you can authenticate with your Google account.

### 3. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "manage-app" or any name you prefer)
4. Follow the prompts to create your project
5. **Copy your Project ID** (you'll need this in the next step)

### 4. Update Firebase Configuration

Edit the `.firebaserc` file in your project and replace `your-project-id` with your actual Firebase Project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 5. Build Your App

Before deploying, you need to build your Vite app:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 6. Initialize Firebase (Optional - if needed)

If you want to reconfigure Firebase settings, run:

```bash
firebase init hosting
```

When prompted:

- Select your Firebase project
- Set public directory to: `dist`
- Configure as single-page app: `Yes`
- Set up automatic builds with GitHub: `No` (unless you want this)
- Don't overwrite existing files if asked

### 7. Deploy to Firebase

```bash
firebase deploy
```

### 8. Access Your App

After deployment completes, Firebase will provide you with a hosting URL like:

```
https://your-project-id.web.app
```

Your app is now live!

## Updating Your App

Whenever you make changes to your app:

1. Build the updated app:

   ```bash
   npm run build
   ```

2. Deploy the changes:
   ```bash
   firebase deploy
   ```

## Useful Firebase Commands

- `firebase hosting:channel:deploy preview` - Deploy to a preview channel
- `firebase hosting:sites:list` - List all hosting sites
- `firebase open hosting:site` - Open your deployed site in browser

## Troubleshooting

- **Build errors**: Make sure all dependencies are installed with `npm install`
- **Deploy fails**: Verify your `.firebaserc` has the correct project ID
- **404 errors**: Check that `firebase.json` has the correct `public` directory set to `dist`

## Notes

- The `dist` folder is automatically created when you run `npm run build`
- Don't commit the `dist` folder to git (it's already in `.gitignore`)
- Your data (income and transfers) is stored in browser localStorage, not on Firebase
- Each user will have their own local data

---

For more information, visit the [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
