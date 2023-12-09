"use client";

import Link from "next/link";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log(error);

  return (
    <>
      <div className="bg-secondary w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div className="bg-primary border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
          <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-primary-content">
            {error.name}
          </p>
          <p className="text-secondary mt-4 pb-4 border-b-2 text-center">
            {error.message}
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 ">
            <Link
              href="/"
              className="flex items-center space-x-2 bg-primary hover:bg-primary-content text-gray-100 px-4 py-2 rounded transition duration-150"
              title="Return Home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"></path>
              </svg>
              <span>Return Home</span>
            </Link>
            <button
              className="flex items-center space-x-2 bg-primary hover:bg-primary-content text-gray-100 px-4 py-2 rounded transition duration-150"
              onClick={() => reset()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
