import { NextResponse } from 'next/server';
import { addAdminRequest, listAdmins } from '../../../../lib/db';
import nodemailer from 'nodemailer';

// ✅ Create email transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
        user: process.env.EMAIL_FROM || '',
        pass: process.env.APP_PASSWORD || process.env.EMAIL_PASSWORD || '',
    }
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // ✅ Validation
        if (!body?.name || !body?.email) {
            return NextResponse.json({
                success: false,
                message: 'নাম এবং ইমেইল প্রবেশ করুন'
            }, { status: 400 });
        }

        if (!body.email.includes('@')) {
            return NextResponse.json({
                success: false,
                message: 'বৈধ ইমেইল প্রবেশ করুন'
            }, { status: 400 });
        }

        // ✅ Check if email already exists
        const admins = await listAdmins();
        const existingAdmin = admins.find(a => a.email.toLowerCase() === body.email.toLowerCase());

        if (existingAdmin) {
            return NextResponse.json({
                success: false,
                message: 'এই ইমেইল ইতিমধ্যে রেজিস্ট্রেশন করেছে। লগিন করুন বা অন্য ইমেইল ব্যবহার করুন।',
                error: 'DUPLICATE_EMAIL'
            }, { status: 409 });
        }

        // ✅ Add new admin request
        await addAdminRequest({ name: body.name, email: body.email });
        
        // ✅ Send confirmation email with NextAuth verification flow
        try {
            const baseUrl = process.env.NEXTAUTH_URL;
            const pendingPageUrl = `${baseUrl}/admin/pending`;
            
            const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 20px auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
                    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
                    .header h1 { margin: 0; font-size: 28px; }
                    .content { padding: 40px 30px; }
                    .content p { color: #333; line-height: 1.6; margin: 15px 0; }
                    .button-container { text-align: center; margin: 30px 0; }
                    .button { background-color: #10b981; color: white; text-decoration: none; padding: 15px 40px; border-radius: 5px; display: inline-block; font-weight: bold; font-size: 16px; }
                    .button:hover { background-color: #059669; }
                    .footer { background-color: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #eee; }
                    .info-box { background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; color: #166534; }
                    .warning-box { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; color: #92400e; }
                    .step { background-color: #f3f4f6; padding: 12px; margin: 10px 0; border-radius: 5px; }
                    .step-title { font-weight: bold; color: #374151; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 স্বাগতম!</h1>
                    </div>
                    <div class="content">
                        <p>আপনাকে স্বাগতম, <strong>${body.name}</strong></p>
                        <p>আপনার এডমিন অ্যাকাউন্ট রেজিস্ট্রেশন অনুরোধ সফলভাবে গৃহীত হয়েছে।</p>
                        
                        <div class="info-box">
                            <strong>📋 পরবর্তী ধাপ:</strong><br/>
                            নিচের বোতাম ক্লিক করুন এবং আপনার অনুমোদনের স্ট্যাটাস দেখুন।
                        </div>

                        <p style="text-align: center; margin-top: 30px;"><strong>আপনার অ্যাকাউন্ট অ্যাক্টিভেট করুন:</strong></p>
                        
                        <div class="button-container">
                            <a href="${pendingPageUrl}" class="button">📝 অনুমোদনের অপেক্ষায় পেজ দেখুন</a>
                        </div>

                        <p style="text-align: center; color: #666; font-size: 13px; margin-top: 15px;">অথবা এই লিঙ্ক অনুলিপি করুন:<br/><span style="word-break: break-all; color: #667eea;">${pendingPageUrl}</span></p>

                        <div class="warning-box">
                            <strong>ℹ️ প্রক্রিয়া:</strong><br/>
                            1️⃣ উপরের বোতাম ক্লিক করুন<br/>
                            2️⃣ আপনার ইমেইল দিয়ে লগইন করুন<br/>
                            3️⃣ একটি সাইন-ইন লিঙ্ক এই ইমেইলে পাঠানো হবে<br/>
                            4️⃣ সেই লিঙ্ক ক্লিক করে verified হন<br/>
                            5️⃣ অনুমোদনের জন্য অপেক্ষা করুন ⏳
                        </div>

                        <p style="margin-top: 30px;">আপনার সহযোগিতার জন্য ধন্যবাদ!<br/><strong>Muslim Aid Admin Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>© 2025 Muslim Aid. সর্বাধিকার সংরক্ষিত।</p>
                        <p>এটি একটি স্বয়ংক্রিয় বার্তা। এই ইমেলের উত্তর দেবেন না।</p>
                    </div>
                </div>
            </body>
            </html>
            `;

            console.log('📧 Sending registration confirmation email to:', body.email);
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: body.email,
                subject: '✅ Muslim Aid Admin রেজিস্ট্রেশন সফল!',
                html: emailHtml,
            });
            console.log('✅ Registration confirmation email sent successfully to:', body.email);
        } catch (emailError) {
            console.error('⚠️ Warning: Failed to send confirmation email:', emailError);
            // Continue anyway - admin is registered even if email fails
        }

        return NextResponse.json({
            success: true,
            message: 'রেজিস্ট্রেশন সফল। ইমেইলে কনফার্মেশন বার্তা পাঠানো হয়েছে।'
        });
    } catch (error) {
        console.error('Request admin error:', error);
        return NextResponse.json({
            success: false,
            message: 'কোনো ত্রুটি ঘটেছে'
        }, { status: 500 });
    }
}
