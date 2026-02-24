import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import fs from 'fs';

// Read .env.local
try {
    const envContent = fs.readFileSync('.env.local', 'utf-8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const [key, ...valParts] = line.split('=');
        const val = valParts.join('=');
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

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const teachers = [
        { name: 'Dr. Muhammad Rashid', role: 'HoD CS / AI', department: 'cs' },
        { name: 'Dr. Sultan Daud Khan', role: 'Associate Professor', department: 'cs' },
        { name: 'Dr. Maria Kanwal', role: 'Assistant Professor', department: 'se' },
        { name: 'Mr. Asif Mehmood', role: 'Lecturer', department: 'ai' },
        { name: 'Ms. Faria Sajjad', role: 'Lecturer', department: 'it' },
        { name: 'Mr. Umar Aftab', role: 'Lecturer', department: 'cs' },
        { name: 'Mr. Muhammad Bilal Rehman', role: 'Lecturer', department: 'ds' },
        { name: 'Ms. Saba Farooq Abbasi', role: 'Lecturer', department: 'cysec' },
        { name: 'Ms. Alina Maryum', role: 'Lecturer', department: 'cs' },
        { name: 'Ms. Amna Ikram', role: 'Lecturer', department: 'se' },
        { name: 'Ms. Kiran Jabeen', role: 'Lecturer', department: 'cs' },
        { name: 'Ms. Laraib Khan', role: 'Lecturer', department: 'it' },
        { name: 'Mr. Mehran Yousaf', role: 'Lecturer', department: 'cysec' },
        { name: 'Ms. Momina Mir', role: 'Lecturer', department: 'cs' },
        { name: 'Mr. Naveed Yousuf', role: 'Lecturer', department: 'se' },
        { name: 'Ms. Noushin Saba', role: 'Lecturer', department: 'ai' },
        { name: 'Ms. Saima Yasmeen', role: 'Lecturer', department: 'cs' },
        { name: 'Ms. Shanza Zafar Malik', role: 'Lecturer', department: 'it' },
        { name: 'Ms. Sumera Aslam', role: 'Lecturer', department: 'ds' },
        { name: 'Ms. Tahreem Khalil', role: 'Lecturer', department: 'se' },
        { name: 'Ms. Tayyaba Kalsoom', role: 'Lecturer', department: 'cs' },
        { name: 'Ms. Zainab Iftikhar', role: 'Lecturer', department: 'ai' },
        { name: 'Mr. Tabinda Nasir', role: 'Lecturer', department: 'cs' },
        { name: 'Mr. Muhammad Arsalan', role: 'Lab Engineer', department: 'it' },
        { name: 'Ms. Ishrat Jabeen', role: 'Lab Engineer', department: 'se' },
        { name: 'Mr. Mohsin Suleman', role: 'Lab Engineer', department: 'cysec' },
        { name: 'Engr. Muhammad Haseeb Khan', role: 'Lab Engineer', department: 'cs' },
        { name: 'Ms. Sabahat Fatima', role: 'Lab Engineer', department: 'ai' },
        { name: 'Mr. Syed Aizaz Hussain Shah', role: 'Lab Engineer', department: 'ds' },
        { name: 'Mr. Umair', role: 'Lab Engineer', department: 'cs' },
        { name: 'Dr. Nauman Razzaq', role: 'HoD Electrical Engineering', department: 'ee' },
        { name: 'Dr. Hamza Ahmad Raza', role: 'Assistant Professor', department: 'ee' },
        { name: 'Dr. Khalid Iqbal', role: 'Associate Professor', department: 'ee' },
        { name: 'Dr. Muhammad Abu Bakr', role: 'Assistant Professor', department: 'cen' },
        { name: 'Mr. M. Atif Javed', role: 'Lecturer', department: 'ee' },
        { name: 'Mr. Syed Shahzad Hussain', role: 'Lecturer', department: 'ee' },
        { name: 'Mr. Yasir Naseer', role: 'Senior Lab Engineer', department: 'ee' },
        { name: 'Dr. Muhammad Mansoor Janjua', role: 'HoD Mechanical Engineering', department: 'me' },
        { name: 'Dr. Ali Javaid', role: 'Assistant Professor', department: 'me' },
        { name: 'Mr. Afnan Ahmed Gillani', role: 'Lecturer', department: 'me' },
        { name: 'Mr. Farrukh Hussain', role: 'Lecturer', department: 'me' },
        { name: 'Mr. Idrees Azeem Rizwan', role: 'Lecturer', department: 'me' },
        { name: 'Mr. Muhammad Basit Shafiq', role: 'Lecturer', department: 'me' },
        { name: 'Dr. Irfan Zafar', role: 'HoD Civil Engineering', department: 'ce' },
        { name: 'Dr. Kamran Latif', role: 'Assistant Professor', department: 'ce' },
        { name: 'Dr. Malik Sarmad Riaz', role: 'Assistant Professor', department: 'ce' },
        { name: 'Mr. Muhammad Yousuf', role: 'Lecturer', department: 'ce' },
        { name: 'Dr. Ubaid Ahmed Nisar', role: 'Faculty', department: 'sash' },
        { name: 'Dr. Muhammad Waqas', role: 'Faculty', department: 'sash' },
        { name: 'Dr. Mehwish Manzur', role: 'Faculty', department: 'sash' },
        { name: 'Dr. Usman Alam Gillani', role: 'Faculty', department: 'sash' },
        { name: 'Dr. Atta Ullah', role: 'Faculty', department: 'sash' },
        { name: 'Dr. Ahsan Abbas', role: 'Faculty', department: 'sash' }
    ].map(t => {
        // Create an email from name
        const email = t.name.toLowerCase().replace(/[^a-z]/g, '') + '@nutech.edu.pk';
        return {
            ...t,
            email,
            rating: 0,
            reviews: 0,
            availableForFyp: true,
            imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=random`,
            expertise: ['Fyp Supervision'] // basic defaults
        };
    });

    async function seedDB() {
        console.log('Starting seeding process...');
        console.log(`Prepared ${teachers.length} teachers.`);
        let batch = writeBatch(db);
        let count = 0;

        for (const teacher of teachers) {
            const docRef = doc(collection(db, 'teachers'));
            batch.set(docRef, teacher);
            count++;

            // Just for safety if it exceeds 500 we would need multiple batches, but we have 53.
        }

        await batch.commit();
        console.log(`✅ Successfully seeded ${count} teachers to Firestore.`);
        process.exit(0);
    }

    seedDB().catch(e => {
        console.error("Error during seeding batch:", e);
        process.exit(1);
    });

} catch (e) {
    console.error("Failed to read environment or initialize:", e);
    process.exit(1);
}
