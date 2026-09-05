require('dotenv').config();

const mongoose = require('mongoose');
const Job = require('./models/Job');
const User = require('./models/User');

const jobs = [
  ['React Developer', 'Tech Solutions', '₹4 - ₹6 LPA', 'Full Time', ['React', 'JavaScript', 'HTML', 'CSS']],
  ['React.js Developer', 'Digital Works', '₹4 - ₹7 LPA', 'Full Time', ['React', 'JavaScript', 'Redux', 'HTML']],
  ['Frontend Developer', 'Code Labs', '₹3 - ₹5 LPA', 'Full Time', ['HTML', 'CSS', 'JavaScript', 'Angular']],
  ['JavaScript Developer', 'WebTech Solutions', '₹4 - ₹6 LPA', 'Full Time', ['JavaScript', 'HTML', 'CSS', 'Git']],
  ['MERN Developer', 'Innovate Systems', '₹5 - ₹8 LPA', 'Full Time', ['MongoDB', 'Express', 'React', 'Node.js']],
  ['MEAN Developer', 'SoftCore Technologies', '₹4 - ₹7 LPA', 'Full Time', ['MongoDB', 'Express', 'Angular', 'Node.js']],
  ['Full Stack Developer', 'NextGen Software', '₹5 - ₹9 LPA', 'Full Time', ['JavaScript', 'React', 'Node.js', 'MongoDB']],
  ['Node.js Developer', 'Backend Labs', '₹4 - ₹7 LPA', 'Full Time', ['Node.js', 'Express', 'MongoDB', 'REST API']],
  ['Web Developer', 'Creative Web Works', '₹3 - ₹5 LPA', 'Full Time', ['HTML', 'CSS', 'JavaScript', 'Bootstrap']],
  ['Software Developer', 'Prime Technologies', '₹4 - ₹6 LPA', 'Full Time', ['JavaScript', 'Node.js', 'SQL', 'Git']],
  ['Junior Developer', 'Startup Hub', '₹3 - ₹5 LPA', 'Full Time', ['JavaScript', 'HTML', 'CSS', 'Git']],
  ['Graduate Software Engineer', 'TechNova', '₹4 - ₹6 LPA', 'Full Time', ['JavaScript', 'Java', 'SQL', 'Git']],
  ['Software Trainee', 'Bright Solutions', '₹2.5 - ₹4 LPA', 'Full Time', ['JavaScript', 'HTML', 'CSS']],
  ['Graduate Trainee', 'FutureSoft', '₹2.5 - ₹4 LPA', 'Full Time', ['Programming', 'JavaScript', 'SQL']],
  ['Software Development Intern', 'DevWorks', '₹12,000 - ₹20,000/month', 'Internship', ['JavaScript', 'React', 'Node.js']],
  ['React Developer Intern', 'Frontend Labs', '₹10,000 - ₹18,000/month', 'Internship', ['React', 'JavaScript', 'HTML', 'CSS']],
  ['Full Stack Developer Intern', 'CodeStart', '₹10,000 - ₹20,000/month', 'Internship', ['MongoDB', 'Express', 'React', 'Node.js']],
  ['Web Development Intern', 'WebCraft', '₹8,000 - ₹15,000/month', 'Internship', ['HTML', 'CSS', 'JavaScript', 'Bootstrap']]
];

async function seedJobs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const user = await User.findOne();

    if (!user) {
      console.log('No user found. Please register first.');
      return;
    }

    const jobData = jobs.map((job) => ({
      title: job[0],
      company: job[1],
      location: 'Pune',
      salary: job[2],
      type: job[3],
      experience: 'Fresher',
      skills: job[4],
      description: 'We are looking for a motivated fresher to join our team and work on real-world software projects.',
      recruiter: user._id
    }));

    await Job.deleteMany({
      company: { $in: jobs.map((job) => job[1]) }
    });

    await Job.insertMany(jobData);

    console.log('18 demo jobs added successfully');
  } catch (error) {
    console.error('Seed failed:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedJobs();