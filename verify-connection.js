import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from 'fs';
import path from 'path';

// Read .env.local
try {
    const envContent = fs.readFileSync('.env.local', 'utf-8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const [key, val] = line.split('=');
        if (key && val) env[key.trim()] = val.trim();
    });

    const firebaseConfig = {
        apiKey: env.VITE_FIREBASE_API_KEY,
        authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.VITE_FIREBASE_APP_ID
    };

    console.log("Checking connection for Project:", firebaseConfig.projectId);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Attempt to fetch from 'teachers' collection
    getDocs(collection(db, "teachers"))
        .then((snapshot) => {
            console.log("✅ SUCCESS: Connected to Firestore!");
            console.log(`Documents found in 'teachers': ${snapshot.size}`);
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ ERROR: Connection failed.");
            console.error(error);
            process.exit(1);
        });

} catch (e) {
    console.error("Failed to read environment or initialize:", e);
}
