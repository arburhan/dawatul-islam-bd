import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Initialize Google Sheets client
export async function getGoogleSheetsClient() {
  if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error('Missing Google Sheets environment variables');
  }

  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  
  return doc;
}

// Volunteer form submission
export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  profession: string;
  skills: string;
  availability: string;
  motivation: string;
  experience: string;
  contactPreference: string;
  references?: string;
  submittedAt: string;
}

export async function submitVolunteerForm(data: VolunteerFormData) {
  try {
    const doc = await getGoogleSheetsClient();
    
    // Get or create the volunteers sheet
    let sheet = doc.sheetsByTitle['Volunteers'];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Volunteers',
        headerValues: [
          'Name',
          'Email',
          'Phone',
          'Age',
          'Location',
          'Profession',
          'Skills',
          'Availability',
          'Motivation',
          'Experience',
          'Contact Preference',
          'References',
          'Submitted At'
        ]
      });
    }

    // Add the row
    await sheet.addRow([
      data.name,
      data.email,
      data.phone,
      data.age,
      data.location,
      data.profession,
      data.skills,
      data.availability,
      data.motivation,
      data.experience,
      data.contactPreference,
      data.references || '',
      data.submittedAt
    ]);

    return { success: true, message: 'Volunteer registration submitted successfully' };
  } catch (error) {
    console.error('Error submitting volunteer form:', error);
    return { success: false, message: 'Failed to submit volunteer registration' };
  }
}

// New Muslim form submission
export interface NewMuslimFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  conversionStatus: 'considering' | 'recent' | 'completed';
  supportNeeded: string[];
  contactPreference: string;
  privacySettings: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  submittedAt: string;
}

export async function submitNewMuslimForm(data: NewMuslimFormData) {
  try {
    const doc = await getGoogleSheetsClient();
    
    // Get or create the new Muslims sheet
    let sheet = doc.sheetsByTitle['New Muslims'];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'New Muslims',
        headerValues: [
          'Name',
          'Email',
          'Phone',
          'Age',
          'Location',
          'Conversion Status',
          'Support Needed',
          'Contact Preference',
          'Privacy Settings',
          'Emergency Contact Name',
          'Emergency Contact Phone',
          'Emergency Contact Relation',
          'Submitted At'
        ]
      });
    }

    // Add the row
    await sheet.addRow([
      data.name,
      data.email,
      data.phone,
      data.age,
      data.location,
      data.conversionStatus,
      data.supportNeeded.join(', '),
      data.contactPreference,
      data.privacySettings,
      data.emergencyContact?.name || '',
      data.emergencyContact?.phone || '',
      data.emergencyContact?.relation || '',
      data.submittedAt
    ]);

    return { success: true, message: 'New Muslim registration submitted successfully' };
  } catch (error) {
    console.error('Error submitting new Muslim form:', error);
    return { success: false, message: 'Failed to submit new Muslim registration' };
  }
}

// Contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isUrgent: boolean;
  submittedAt: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const doc = await getGoogleSheetsClient();
    
    // Get or create the contacts sheet
    let sheet = doc.sheetsByTitle['Contacts'];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Contacts',
        headerValues: [
          'Name',
          'Email',
          'Phone',
          'Subject',
          'Message',
          'Is Urgent',
          'Submitted At'
        ]
      });
    }

    // Add the row
    await sheet.addRow([
      data.name,
      data.email,
      data.phone || '',
      data.subject,
      data.message,
      data.isUrgent ? 'Yes' : 'No',
      data.submittedAt
    ]);

    return { success: true, message: 'Contact form submitted successfully' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, message: 'Failed to submit contact form' };
  }
} 