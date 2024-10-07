import React from "react";

function About() {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold">About</h1>

      <div className="mt-6 space-y-4">
        <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-purple-500">
          Welcome to our Job Search Application, a powerful tool designed to
          streamline your job hunting process.
        </p>
        <p>
          This React-based application offers a comprehensive suite of features
          to help you manage your job search effectively:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Track multiple job applications in one place</li>
          <li>
            Organize jobs by status: Applied, Pending, Interview, Offer, or
            Rejected
          </li>
          <li>
            Add detailed information for each job, including company, location,
            and job description
          </li>
          <li>View your job search progress with an intuitive dashboard</li>
          <li>Easily edit or delete job entries as needed</li>
          <li>
            Search and filter your job listings for quick access to information
          </li>
        </ul>
        <p>
          Our goal is to make your job search more efficient and less stressful.
          By centralizing all your job-related information, we help you stay
          organized and focused on landing your dream job.
        </p>
        <p>
          Start using our Job Search Application today and take control of your
          career journey!
        </p>
      </div>
    </div>
  );
}

export default About;
