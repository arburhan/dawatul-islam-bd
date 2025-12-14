import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { listAdmins } from '@/lib/db';
import { MongoClient } from 'mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
        user: process.env.EMAIL_FROM || '',
        pass: process.env.APP_PASSWORD || process.env.EMAIL_PASSWORD || '',
    }
});

// Create MongoDB client promise
const mongoClientPromise = (async () => {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) throw new Error('MONGODB_URI is not set for NextAuth adapter');
    const client = new MongoClient(uri);
    await client.connect();
    return client;
})();

const authOptions: NextAuthOptions = {
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
                port: Number(process.env.EMAIL_PORT || 587),
                secure: false,
                auth: {
                    user: process.env.EMAIL_FROM || '',
                    pass: process.env.APP_PASSWORD || process.env.EMAIL_PASSWORD || '',
                }
            },
            from: process.env.EMAIL_FROM || '',
            maxAge: 24 * 60 * 60, // 24 hours
            async sendVerificationRequest({ identifier: email, url }) {
                try {
                    console.log('📧 sendVerificationRequest called with URL:', url);
                    
                    // ✅ Ensure URL is valid
                    if (!url) {
                        console.error('❌ Email verification URL is empty');
                        throw new Error('Verification URL is missing');
                    }

                    // ✅ Validate URL
                    try {
                        new URL(url);
                    } catch (e) {
                        console.error('❌ Invalid URL:', url, e);
                        throw new Error(`Invalid verification URL: ${url}`);
                    }

                    const signinUrl = url;
                    
                    const emailHtml = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
                            .container { max-width: 600px; margin: 20px auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
                            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                            .header h1 { margin: 0; font-size: 28px; }
                            .content { padding: 40px 30px; }
                            .content p { color: #333; line-height: 1.6; margin: 15px 0; }
                            .button-container { text-align: center; margin: 30px 0; }
                            .button { background-color: #667eea; color: white; text-decoration: none; padding: 12px 30px; border-radius: 5px; display: inline-block; font-weight: bold; }
                            .button:hover { background-color: #5568d3; }
                            .footer { background-color: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #eee; }
                            .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px 15px; margin: 20px 0; color: #856404; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>🔐 Admin Sign In</h1>
                            </div>
                            <div class="content">
                                <p>Peace be upon you,</p>
                                <p>You've requested to sign in to the <strong>Muslim Aid Admin Panel</strong>.</p>
                                <p>Click the button below to authenticate and access your dashboard:</p>
                                <div class="button-container">
                                    <a href="${signinUrl}" class="button">Sign In Now</a>
                                </div>
                                <p style="font-size: 14px; color: #666;">Or copy this link: <br><span style="word-break: break-all; color: #667eea;">${signinUrl}</span></p>
                                <div class="warning">
                                    <strong>⚠️ Security Note:</strong> This link expires in 24 hours. If you didn't request this sign-in, please ignore this email.
                                </div>
                                <p>Best regards,<br><strong>Muslim Aid Admin Team</strong></p>
                            </div>
                            <div class="footer">
                                <p>© 2025 Muslim Aid. All rights reserved.</p>
                                <p>This is an automated message. Please do not reply to this email.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    `;

                    console.log('📧 Sending verification email to:', email);
                    await transporter.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: email,
                        subject: '🔐 আপনার Muslim Aid Admin Panel সাইন-ইন লিঙ্ক',
                        html: emailHtml,
                    });
                    console.log('✅ Email sent successfully to:', email);
                } catch (error) {
                    console.error('❌ Email send failed:', error);
                    throw new Error('Failed to send verification email');
                }
            }
        })
    ],
    adapter: MongoDBAdapter(mongoClientPromise),
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/admin/login',
        verifyRequest: '/admin/verify-email',
        error: '/admin/login'
    },
    callbacks: {
        // ✅ CRITICAL: Admin role check here
        async signIn({ user }) {
            try {
                if (!user?.email) return false;

                // ✅ Admin list থেকে check করব
                const admins = await listAdmins();
                const adminRecord = admins.find(a => a.email.toLowerCase() === (user.email || '').toLowerCase());

                console.log('🔐 Auth Check:', { email: user.email, role: adminRecord?.role });

                // ✅ শুধুমাত্র 'admin' role থাকলে sign-in করতে দেবে
                if (adminRecord?.role === 'admin') {
                    console.log('✅ Admin approved:', user.email);
                    return true;
                }

                // ⏳ Pending admin - allow but mark as pending
                if (adminRecord?.role === 'requested') {
                    console.log('⏳ Admin pending - allowing login:', user.email);
                    return true;
                }

                // ❌ অন্য role বা না খুঁজে পেলে - reject করব
                console.log('❌ Admin not found or invalid role:', user.email, adminRecord?.role);
                return false;
            } catch (error) {
                console.error('Auth signIn error:', error);
                return false;
            }
        },

        // ✅ JWT token তৈরি
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
                
                // ✅ Admin role add করব token এ
                const admins = await listAdmins();
                const adminRecord = admins.find(a => a.email.toLowerCase() === (user.email || '').toLowerCase());
                token.role = adminRecord?.role || 'unknown';
                console.log('🔑 JWT Token created:', { email: token.email, role: token.role });
            }
            return token;
        },

        // ✅ Session তে user info add করব
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                (session.user as { role?: string }).role = token.role as string;
            }
            return session;
        },

        // ✅ Redirect logic - pending user দের pending page এ নিয়ে যাব
        async redirect({ baseUrl, url }) {
            console.log('🔄 Redirect callback:', { baseUrl, url });
            
            // যদি ইতিমধ্যে /admin/pending বা /admin/verify-email এ যেতে চায় তাহলে যেতে দেব
            if (url.includes('/admin/pending') || url.includes('/admin/verify-email')) {
                return url;
            }
            
            // যদি সাধারণ URL থাকে তাহলে সেটা use করব
            if (url.startsWith(baseUrl)) return url;
            
            // Default dashboard এ যাব
            return `${baseUrl}/admin/dashboard`;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
