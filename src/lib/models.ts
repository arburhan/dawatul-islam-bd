import mongoose from 'mongoose';

const { Schema } = mongoose;

export const AdminSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    role: { type: String, default: 'requested' },
    access: [String],
    requestedAt: { type: Date, default: Date.now }
});

export const VolunteerSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    contacted: { type: Boolean, default: false },
    age: Number,
    location: String,
    profession: String,
    skills: String,
    availability: String,
    experience: String,
    references: String,
    message: String,
    submittedAt: { type: Date, default: Date.now }
});

export const DonatorSchema = new Schema({
    name: String,
    address: String,
    mobile: String,
    contacted: { type: Boolean, default: false },
    donationType: String,
    amount: Number,
    comment: String,
    submittedAt: { type: Date, default: Date.now }
});

export const NoteSchema = new Schema({
    kind: String,
    refId: String,
    note: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
});

export const CallSchema = new Schema({
    kind: String,
    refId: String,
    phone: String,
    by: String,
    at: { type: Date, default: Date.now }
});

export const EventSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, // Lexical editor JSON state
    excerpt: String,
    eventDate: Date,
    location: String,
    image: String, // Main event image URL
    published: { type: Boolean, default: false },
    createdBy: String, // Admin email
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);
export const Donator = mongoose.models.Donator || mongoose.model('Donator', DonatorSchema);
export const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);
export const Call = mongoose.models.Call || mongoose.model('Call', CallSchema);
export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
