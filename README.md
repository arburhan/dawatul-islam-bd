# New Muslim Support Website - Bangladesh

A comprehensive website to support new Muslims in Bangladesh who have recently converted to Islam and need guidance on their spiritual journey. This project is built with Next.js 14, Sanity CMS, and includes full internationalization support for Bengali and English.

## 🌟 Features

- **Bilingual Support**: Complete Bengali and English language support
- **Modern Design**: Islamic-themed design with beautiful UI/UX
- **Content Management**: Sanity CMS integration for easy content management
- **Form Integration**: Google Sheets integration for form submissions
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for fast loading and SEO

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom Islamic theme
- **CMS**: Sanity.io
- **Internationalization**: next-intl
- **Forms**: Google Sheets API integration
- **Icons**: Heroicons
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd new-muslim-aid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Sanity CMS Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-12-01

   # Google Sheets Integration
   GOOGLE_SPREADSHEET_ID=your-google-spreadsheet-id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── layout.tsx      # Locale-specific layout
│   │   ├── page.tsx        # Homepage
│   │   └── ...             # Other pages
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/
│   ├── home/               # Homepage components
│   ├── Header.tsx          # Main navigation
│   ├── Footer.tsx          # Site footer
│   └── ...                 # Other components
├── lib/
│   ├── sanity.ts           # Sanity configuration
│   └── google-sheets.ts    # Google Sheets integration
├── messages/
│   ├── bn.json             # Bengali translations
│   └── en.json             # English translations
└── i18n/
    └── config.ts           # i18n configuration
```

## 🌐 Pages Structure

- **Homepage** (`/`): Hero section, navigation cards, stats, testimonials
- **Why Islam** (`/why-islam`): Core principles and teachings
- **How to Convert** (`/how-to-convert`): Step-by-step conversion guide
- **New Muslim Guide** (`/new-muslim-guide`): Post-conversion guidance
- **Challenges** (`/challenges`): Common problems and solutions
- **Projects** (`/projects`): Current initiatives and programs
- **About Us** (`/about`): Organization information
- **Contact** (`/contact`): Contact forms and information
- **Volunteer** (`/volunteer`): Volunteer registration

## 🎯 Key Features

### Internationalization
- Bengali (default) and English language support
- Automatic language detection
- Easy language switching
- Culturally appropriate content for each language

### Islamic Design
- Islamic color scheme (deep green, gold accents)
- Bengali font support (Noto Sans Bengali)
- Islamic geometric patterns
- Respectful and culturally sensitive design

### Form Integration
- Volunteer registration form
- New Muslim enrollment form
- Contact forms with emergency support
- Google Sheets integration for data collection

### Content Management
- Sanity CMS for easy content updates
- Blog posts and updates
- Team member profiles
- Project showcases
- Testimonials management

## 🔧 Configuration

### Sanity CMS Setup
1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Set up your project ID and dataset
3. Configure the environment variables
4. Create content schemas for:
   - Blog posts
   - Team members
   - Projects
   - Testimonials
   - Site settings

### Google Sheets Integration
1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a service account
4. Download the service account key
5. Share your Google Sheet with the service account email
6. Configure environment variables

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🎨 Customization

### Colors
The Islamic color scheme can be customized in `tailwind.config.ts`:
```typescript
colors: {
  islamic: {
    primary: '#1B4332',    // Deep Islamic green
    secondary: '#2D5A40',  // Medium green
    accent: '#FFD700',     // Gold accent
    // ... other colors
  }
}
```

### Fonts
Bengali and English fonts are configured in `globals.css`:
```css
.font-bengali {
  font-family: 'Noto Sans Bengali', 'Kalpurush', 'SolaimanLipi', sans-serif;
}
```

### Content
All content is managed through:
- Translation files in `src/messages/`
- Sanity CMS for dynamic content
- Component-level content for static elements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 Content Guidelines

### Islamic Authenticity
- All Islamic content must be verified by qualified scholars
- Use authentic Quranic references and Hadith
- Maintain cultural sensitivity for Bengali Muslim traditions
- Avoid controversial topics, focus on universally accepted teachings

### Writing Style
- Clear and simple language
- Empathetic and supportive tone
- Practical, actionable advice
- Progressive structure from basic to advanced concepts

## 🔒 Security & Privacy

- All sensitive data is encrypted
- Privacy-first approach for user data
- GDPR-compliant data handling
- Secure form submissions
- Regular security updates

## 📞 Support

For technical support or questions about the project:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Islamic scholars who reviewed the content
- Bengali Muslim community for cultural guidance
- Open source contributors
- Volunteers who helped with testing

---

**Note**: This is a sensitive project that deals with religious conversion and cultural identity. Please approach all development and content creation with the utmost respect and cultural sensitivity.
