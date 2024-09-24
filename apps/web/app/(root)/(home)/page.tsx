import Hero from "./_components/hero";
import HeroForm from "./_components/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <header className="border-b-2">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Beeetle</span>
          </Link>
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              href="/explore"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Explore
            </Link>
            <Link
              href="/trips"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Trips
            </Link>
            <Link
              href="/flights"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Flights
            </Link>
            <Link
              href="/hotels"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Hotels
            </Link>
            <Link
              href="/car-rentals"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Car rentals
            </Link>
            <Link
              href="/cruises"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cruises
            </Link>
            <div className="flex items-center space-x-4">
              {/* Adjust button sizes and align icons */}
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 flex items-center justify-center bg-gray-300/50 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 9l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                  <path d="M9 22V12h6v10" />
                </svg>
                <span className="sr-only">Home</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 flex items-center justify-center bg-gray-300/50 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 3h18v18H3V3z" />
                  <path d="M3 3l18 18" />
                </svg>
                <span className="sr-only">Settings</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 flex items-center rounded-full justify-center bg-gradient-to-b from-blue-500 to-purple-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-white"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="sr-only">Profile</span>
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <div className="min-h-screen bg-white sm:px-20 px-8 lg:px-56 mb-28">
        <Hero />
        <HeroForm />
      </div>
      <Footer />
    </>
  );
}
