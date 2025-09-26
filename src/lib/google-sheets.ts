// Donator form submission
export interface DonatorFormData {
  name: string;
  address: string;
  mobile: string;
  donationType: string;
  amount: string;
  comment?: string;
  submittedAt?: string;
}

export async function appendDonationToSheet(data: DonatorFormData) {
  try {
    const doc = await getGoogleSheetsClient();
    let sheet = doc.sheetsByTitle['Donations'];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Donations',
        headerValues: [
          'Name',
          'Address',
          'Mobile',
          'Donation Type',
          'Amount',
          'Comment',
          'Submitted At'
        ]
      });
    }
    await sheet.addRow([
      data.name,
      data.address,
      data.mobile,
      data.donationType,
      data.amount,
      data.comment || '',
      data.submittedAt || new Date().toISOString()
    ]);
    return { success: true, message: 'Donation submitted successfully' };
  } catch (error) {
    console.error('Error submitting donation:', error);
    return { success: false, message: 'Failed to submit donation' };
  }
}
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
  experience: string;
  references?: string;
  message: string;
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
          'Experience',
          'References',
          'Message',
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
      data.experience,
      data.references || '',
      data.message,
      data.submittedAt
    ]);

    return { success: true, message: 'Volunteer registration submitted successfully' };
  } catch (error) {
    console.error('Error submitting volunteer form:', error);
    return { success: false, message: 'Failed to submit volunteer registration' };
  }
}

