# Environment Variables Setup Guide

## Contact Form Environment Variables

Your contact form requires the following environment variables to work on Vercel:

### Required Variables

1. **GMAIL_USER**
   - Your Gmail address that will send the emails
   - Example: `yourname@gmail.com`

2. **GMAIL_CLIENT_ID**
   - OAuth2 Client ID from Google Cloud Console
   - Format: `xxxxx.apps.googleusercontent.com`

3. **GMAIL_CLIENT_SECRET**
   - OAuth2 Client Secret from Google Cloud Console
   - Keep this secure!

4. **GMAIL_REFRESH_TOKEN**
   - OAuth2 Refresh Token with Gmail API scope
   - This allows the app to send emails on your behalf

### Optional Variables

5. **GMAIL_TO** (optional)
   - Recipient email address
   - Defaults to `GMAIL_USER` if not set
   - Example: `recipient@gmail.com`

## How to Add Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter each variable name and value
6. Select environments: **Production**, **Preview**, and/or **Development**
7. Click **Save**
8. **Redeploy** your application (or push a new commit)

## Local Development Setup

Create a `.env.local` file in the root directory:

```env
GMAIL_USER=yourname@gmail.com
GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token
GMAIL_TO=recipient@gmail.com
```

⚠️ **Never commit `.env` files to GitHub!** They are already in `.gitignore`.

## Getting Gmail API Credentials

If you need to set up Gmail API credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Gmail API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Set authorized redirect URIs
7. Generate refresh token using OAuth2 flow

## Troubleshooting

### Contact form works locally but not on Vercel

✅ **Check:**
- All environment variables are set in Vercel dashboard
- Variables are added to the correct environment (Production/Preview)
- Application has been redeployed after adding variables
- Check Vercel function logs for error messages

### Common Errors

- **"Gmail OAuth credentials are missing"** → Add `GMAIL_CLIENT_ID` and `GMAIL_CLIENT_SECRET`
- **"Gmail REFRESH_TOKEN is missing"** → Add `GMAIL_REFRESH_TOKEN`
- **"Gmail USER email is missing"** → Add `GMAIL_USER`
- **401 Authentication failed** → Check if refresh token is valid and not expired
- **403 Permission denied** → Ensure Gmail API is enabled and refresh token has correct scopes

## Security Notes

- Environment variables in Vercel are encrypted at rest
- Never share your `GMAIL_CLIENT_SECRET` or `GMAIL_REFRESH_TOKEN`
- Rotate credentials if they are ever exposed
- Use different credentials for development and production if possible


