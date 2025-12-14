import { NextRequest, NextResponse } from 'next/server';
import { approveAdmin, listAdmins } from '@/lib/db';
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

/**
 * POST /api/admin/manual-approve
 * সুপার admin এর জন্য - কোনো admin কে manually approve করতে পারবে
 * Body: { email: string, adminSecret: string }
 */
export async function POST(req: NextRequest) {
    try {
        const { email, adminSecret } = await req.json();

        // ✅ Simple security check
        const SECRET = process.env.ADMIN_MANUAL_SECRET || 'dev-secret-change-in-production';
        
        if (adminSecret !== SECRET) {
            return NextResponse.json(
                { error: 'Invalid admin secret' },
                { status: 401 }
            );
        }

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email required' },
                { status: 400 }
            );
        }

        // ✅ Get admin name
        const admins = await listAdmins();
        const admin = admins.find(a => a.email.toLowerCase() === email.toLowerCase());
        const adminName = admin?.name || 'Admin';

        // ✅ Admin কে approve করব
        await approveAdmin(email, []);

        // ✅ Send approval email
        try {
            const loginUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/login`;
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
                    .button { background-color: #10b981; color: white; text-decoration: none; padding: 12px 30px; border-radius: 5px; display: inline-block; font-weight: bold; }
                    .button:hover { background-color: #059669; }
                    .footer { background-color: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #eee; }
                    .success-box { background-color: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; color: #065f46; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 আপনার অনুমোদন হয়েছে!</h1>
                    </div>
                    <div class="content">
                        <p>আপনাকে স্বাগতম, <strong>${adminName}</strong>!</p>
                        <div class="success-box">
                            <strong>✅ সাফল্য!</strong><br/>
                            আপনার এডমিন রেজিস্ট্রেশন অনুরোধ অনুমোদিত হয়েছে। এখন আপনি আমাদের এডমিন প্যানেলে সম্পূর্ণ অ্যাক্সেস পাবেন।
                        </div>
                        <p>এই লিঙ্কটি ব্যবহার করে এখনই লগইন করুন:</p>
                        <div class="button-container">
                            <a href="${loginUrl}" class="button">Admin Panel এ প্রবেশ করুন</a>
                        </div>
                        <p style="font-size: 14px; color: #666;">অথবা এই লিঙ্কটি কপি করুন: <br><span style="word-break: break-all; color: #10b981;">${loginUrl}</span></p>
                        <p><strong>ধাপগুলি:</strong></p>
                        <ol style="color: #333; line-height: 1.8;">
                            <li>উপরের বোতাম ক্লিক করুন বা লিঙ্কটি কপি করুন</li>
                            <li>আপনার ইমেল ঠিকানা প্রবেশ করুন: <strong>${email}</strong></li>
                            <li>আপনার মেইলবক্সে সাইন-ইন লিঙ্কটি খুঁজুন এবং ক্লিক করুন</li>
                            <li>এডমিন ড্যাশবোর্ডে স্বাগতম!</li>
                        </ol>
                        <p>আপনার সেবার জন্য ধন্যবাদ!<br/><strong>Muslim Aid Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>© 2025 Muslim Aid. সর্বাধিকার সংরক্ষিত।</p>
                        <p>এটি একটি স্বয়ংক্রিয় বার্তা। এই ইমেলের উত্তর দেবেন না।</p>
                    </div>
                </div>
            </body>
            </html>
            `;

            console.log('📧 Sending approval email to:', email);
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: '✅ Muslim Aid Admin - আপনার অনুমোদন হয়েছে!',
                html: emailHtml,
            });
            console.log('✅ Approval email sent successfully to:', email);
        } catch (emailError) {
            console.error('⚠️ Warning: Failed to send approval email:', emailError);
            // Continue anyway - admin is approved even if email fails
        }

        return NextResponse.json({
            success: true,
            message: `Admin ${email} has been approved! Notification email sent.`,
        });
    } catch (error) {
        console.error('Manual approve error:', error);
        return NextResponse.json(
            { error: 'Failed to approve admin' },
            { status: 500 }
        );
    }
}
