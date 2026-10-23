import { profile } from './profile';
// FormSubmit requires the recipient to confirm its activation email once.
// No secret or server is required. Tests intercept requests and never send email.
export const contact = {
  recipient: profile.email,
  details: {
    location: profile.location,
    availability: 'Remote & Local Projects',
    responseTime: 'I typically respond within 24 hours on business days.',
  },
  endpoint: `https://formsubmit.co/ajax/${profile.email}`,
  fallbackEndpoint: `https://formsubmit.co/${profile.email}`,
  subject: 'New portfolio enquiry — Elisha Matanga',
};
