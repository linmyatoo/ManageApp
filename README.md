# ManageApp - Income & Transfer Tracker

A responsive web application to track your income and transfers across multiple bank accounts with cloud synchronization.

## 🎯 Features

- ✅ Track income from multiple banks
- ✅ Record money transfers
- ✅ View summaries grouped by bank
- ✅ See your final balance (Income - Transfers)
- ✅ Cloud storage - data syncs across all devices
- ✅ Fully responsive design (works on mobile, tablet, desktop)
- ✅ Data persistence with Firebase Firestore

## 🚨 SETUP REQUIRED

**The app now uses Firebase Firestore for cloud storage.** You need to complete a quick 5-minute setup to enable this feature.

👉 **Read `SETUP_REQUIRED.md` for quick setup instructions**

Or see `FIRESTORE_SETUP.md` for detailed step-by-step guide.

## 🌐 Live App

https://manageapp-fa78c.web.app

## 🛠️ Technologies

- React 18
- Vite
- Firebase Firestore (Database)
- Firebase Hosting (Deployment)
- CSS (Responsive Design)

## 📱 How to Use

1. Click **"Income"** to add income entries
   - Enter amount
   - Select bank account
   - Submit
2. Click **"Transfer"** to record money transfers
   - Enter amount
   - Submit
3. View summaries:
   - **Income Summary**: Grouped by bank with totals
   - **Transfer Summary**: All transfers with total
   - **Final Balance**: Your remaining balance

## 🔧 Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Deploy to Firebase:

```bash
firebase deploy
```

## 📂 Project Structure

```
ManageApp/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Responsive styles
│   ├── firebase.js      # Firebase configuration
│   └── main.jsx         # App entry point
├── public/
├── firebase.json        # Firebase hosting config
├── .firebaserc         # Firebase project config
└── README.md
```

## 📝 Documentation

- `SETUP_REQUIRED.md` - Quick setup guide for Firebase
- `FIRESTORE_SETUP.md` - Detailed Firestore setup instructions
- `DEPLOYMENT.md` - Firebase deployment guide

## 🔐 Security Note

Currently, the app allows anyone with the URL to read/write data. This is suitable for personal use. If you want to add user authentication, refer to Firebase Authentication documentation.

## 📄 License

MIT
