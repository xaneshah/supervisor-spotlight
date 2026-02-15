import type { Teacher, Review } from '@/types';

const now = Date.now();
const h = (hours: number) => new Date(now - hours * 3600000);

export const mockTeachers: Teacher[] = [
  { id: '1', name: 'Dr. Sarah Ahmed', department: 'ai', role: 'Associate Professor', subject: 'Machine Learning', rating: 4.8, isAvailable: true },
  { id: '2', name: 'Prof. Ali Hassan', department: 'cs', role: 'Professor', subject: 'Distributed Systems', rating: 4.5, isAvailable: true },
  { id: '3', name: 'Dr. Fatima Zahra', department: 'ai', role: 'Assistant Professor', subject: 'Natural Language Processing', rating: 4.9, isAvailable: false },
  { id: '4', name: 'Dr. Omar Khalid', department: 'ee', role: 'Lecturer', subject: 'VLSI Design', rating: 3.8, isAvailable: true },
  { id: '5', name: 'Prof. Ayesha Siddiqui', department: 'cs', role: 'HOD', subject: 'Software Engineering', rating: 4.2, isAvailable: false },
  { id: '6', name: 'Dr. Hassan Raza', department: 'ai', role: 'Associate Professor', subject: 'Computer Vision', rating: 4.6, isAvailable: true },
  { id: '7', name: 'Dr. Nadia Malik', department: 'ee', role: 'Assistant Professor', subject: 'Embedded Systems', rating: 4.1, isAvailable: true },
  { id: '8', name: 'Prof. Kamran Sheikh', department: 'cs', role: 'Professor', subject: 'Database Systems', rating: 3.9, isAvailable: false },
  { id: '9', name: 'Dr. Zainab Qureshi', department: 'ai', role: 'Lecturer', subject: 'Deep Learning', rating: 4.7, isAvailable: true },
  { id: '10', name: 'Dr. Bilal Tariq', department: 'ee', role: 'Associate Professor', subject: 'Signal Processing', rating: 4.3, isAvailable: true },
  { id: '11', name: 'Prof. Hina Ashraf', department: 'cs', role: 'Assistant Professor', subject: 'Cybersecurity', rating: 4.4, isAvailable: true },
  { id: '12', name: 'Dr. Usman Ghani', department: 'ee', role: 'Lecturer', subject: 'Power Electronics', rating: 3.6, isAvailable: false },
];

export const mockReviews: Review[] = [
  { id: 'r1', teacherId: '1', comment: 'Dr. Sarah is incredibly knowledgeable in ML. She guided my FYP on sentiment analysis and was always available for consultations. Highly recommend!', rating: 5, isAnonymous: false, timestamp: h(2) },
  { id: 'r2', teacherId: '1', comment: 'Great supervisor but can be quite demanding with deadlines. You will learn a lot though.', rating: 4, isAnonymous: true, timestamp: h(48) },
  { id: 'r3', teacherId: '1', comment: 'Best professor in the AI department. Her research papers are top-notch and she encourages students to publish.', rating: 5, isAnonymous: false, timestamp: h(120) },
  { id: 'r4', teacherId: '2', comment: 'Prof. Ali has deep knowledge of distributed systems. He helped me design a scalable microservices architecture for my FYP.', rating: 5, isAnonymous: false, timestamp: h(5) },
  { id: 'r5', teacherId: '2', comment: 'Good professor but sometimes hard to schedule meetings. Overall positive experience.', rating: 4, isAnonymous: true, timestamp: h(72) },
  { id: 'r6', teacherId: '3', comment: 'Dr. Fatima is a gem! Her NLP expertise is unmatched. She pushed me to achieve results I did not think were possible.', rating: 5, isAnonymous: false, timestamp: h(8) },
  { id: 'r7', teacherId: '3', comment: 'Absolutely brilliant researcher. Learned more in her lab than in four years of coursework combined.', rating: 5, isAnonymous: false, timestamp: h(200) },
  { id: 'r8', teacherId: '4', comment: 'Dr. Omar is a good lecturer but his FYP supervision style is quite hands-off. Be prepared to work independently.', rating: 3, isAnonymous: true, timestamp: h(24) },
  { id: 'r9', teacherId: '4', comment: 'Decent supervisor. Gave me freedom to explore my own ideas in VLSI which I appreciated.', rating: 4, isAnonymous: false, timestamp: h(168) },
  { id: 'r10', teacherId: '5', comment: 'As HOD, Prof. Ayesha is very busy but when she is available, her feedback is invaluable. Great industry connections.', rating: 4, isAnonymous: false, timestamp: h(12) },
  { id: 'r11', teacherId: '6', comment: 'Dr. Hassan is passionate about computer vision. He introduced me to cutting-edge techniques that made my FYP stand out.', rating: 5, isAnonymous: false, timestamp: h(36) },
  { id: 'r12', teacherId: '6', comment: 'Very supportive supervisor. Always responds to emails within a day.', rating: 4, isAnonymous: true, timestamp: h(96) },
  { id: 'r13', teacherId: '7', comment: 'Dr. Nadia made embedded systems fun and practical. My FYP on IoT was a great learning experience under her guidance.', rating: 4, isAnonymous: false, timestamp: h(18) },
  { id: 'r14', teacherId: '8', comment: 'Prof. Kamran knows databases inside out but his teaching style can be a bit dry. Good for research-oriented students.', rating: 3, isAnonymous: true, timestamp: h(240) },
  { id: 'r15', teacherId: '8', comment: 'Solid supervisor if you are into database optimization. Not the most exciting but very thorough.', rating: 4, isAnonymous: false, timestamp: h(360) },
  { id: 'r16', teacherId: '9', comment: 'Dr. Zainab is amazing! Her deep learning course prepared me so well for my FYP on image generation. She is young and energetic.', rating: 5, isAnonymous: false, timestamp: h(6) },
  { id: 'r17', teacherId: '9', comment: 'One of the best in the department. Really cares about her students success.', rating: 5, isAnonymous: true, timestamp: h(144) },
  { id: 'r18', teacherId: '10', comment: 'Dr. Bilal has strong fundamentals in signal processing. Helped me build a solid theoretical foundation for my project.', rating: 4, isAnonymous: false, timestamp: h(30) },
  { id: 'r19', teacherId: '11', comment: 'Prof. Hina is excellent for cybersecurity FYPs. She has real-world experience that she brings to supervision.', rating: 5, isAnonymous: false, timestamp: h(14) },
  { id: 'r20', teacherId: '11', comment: 'Very organized supervisor. Sets clear milestones and checks in regularly. Great experience overall.', rating: 4, isAnonymous: false, timestamp: h(80) },
  { id: 'r21', teacherId: '12', comment: 'Dr. Usman is knowledgeable but not very available. Had to wait weeks for feedback sometimes.', rating: 3, isAnonymous: true, timestamp: h(400) },
  { id: 'r22', teacherId: '12', comment: 'Average supervision experience. He knows his stuff but communication could be better.', rating: 3, isAnonymous: false, timestamp: h(500) },
  { id: 'r23', teacherId: '3', comment: 'Wish she was taking more students. The waitlist for her supervision is crazy long for a reason.', rating: 5, isAnonymous: true, timestamp: h(300) },
  { id: 'r24', teacherId: '1', comment: 'Challenging but rewarding. Dr. Sarah expects excellence and helps you deliver it.', rating: 4, isAnonymous: false, timestamp: h(180) },
];
