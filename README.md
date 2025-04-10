# Sydney Badminton Court Finder

A modern web application built with Next.js, TypeScript, and Tailwind CSS that helps badminton players find and book courts across Sydney, Australia.

## Features

- Search for badminton courts by postcode, date, and time
- Browse real venues with detailed information
- View court availability and pricing
- Book courts directly through venue booking sites
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend Framework**: Next.js 15+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Local Development

To run this project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app directory
  - `/components` - Reusable UI components
  - `/api` - API routes and services
    - `/data` - Local data for venues and courts
  - `/venues` - Venue detail pages
  - `/search` - Search results page

## Deployment on Vercel

This project is optimized for deployment on Vercel. Follow these steps to deploy your own instance:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Import the project to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the "my-website" repository

3. **Configure the project**:
   - Framework Preset: Next.js
   - Root Directory: `my-website` (if your code is in this subdirectory)
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Environment Variables**:
   - No environment variables are required for the basic deployment

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll receive a URL for your deployed site (e.g., `https://sydney-badminton-finder.vercel.app`)

## Using Real Data (Experimental)

The application currently uses local fallback data in the `/app/api/data/venues.ts` file. To use real data:

1. Create API endpoints for your venue data in `/app/api/courts/...`
2. Update the service in `/app/api/courts/service.ts` to fetch from real venue APIs
3. Implement proper error handling and caching

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is MIT licensed.

## Contact

For any questions, please contact [your-email@example.com].
