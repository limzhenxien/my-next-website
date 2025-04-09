# SydneyShuttle - Badminton Court Booking

A Sydney-based badminton court booking platform that allows users to find and book courts from various providers like NBC, KBC, and Alpha in one place.

## Features

- 🔍 **Location Search**: Find courts near you by entering your postcode or suburb
- 📅 **Date & Time Selection**: Choose your preferred date and time for playing
- 🏸 **Venue Comparison**: Compare availability and prices across different venues
- 📱 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- 🔄 **Real-time Availability**: Get up-to-date information on court availability
- 📊 **Venue Profiles**: Detailed information about each badminton venue

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sydney-shuttle.git
cd sydney-shuttle
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
sydney-shuttle/
├── app/                  # Next.js App Router
│   ├── components/       # Reusable components
│   │   ├── Navbar.tsx    # Navigation component
│   │   ├── Footer.tsx    # Footer component
│   │   └── SearchForm.tsx # Court search form
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
├── .eslintrc.json        # ESLint configuration
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Road Map

- **Court Booking System**: Implement actual booking functionality with payment processing
- **User Accounts**: Allow users to create accounts, view booking history, and save preferences
- **Venue Integration**: API integration with partner venue booking systems
- **Reviews & Ratings**: Allow users to rate and review venues
- **Mobile App**: Develop native mobile applications for iOS and Android

## Partner Venues

- **NBC Badminton Centre**: Premium courts with professional facilities
- **KBC Badminton**: Community-focused badminton venues with competitive pricing
- **Alpha Badminton Club**: High-quality courts with coaching services

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
