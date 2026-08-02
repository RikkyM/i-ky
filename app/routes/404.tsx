import { isRouteErrorResponse, Link } from "react-router";
import background from "~/assets/background.webp";
import { cn } from "~/lib/utils";

export const ErrorPages = ({ error }: { error: unknown }) => {
  let message;
  let details;
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The page you're looking for doesn't exist, or it may have moved."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main
      className={cn(
        "font-ibm relative flex h-dvh max-h-dvh w-full scrollbar-none flex-col items-center justify-center overflow-hidden bg-[#131313]",
        "bg-cover bg-center",
      )}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="z-10 mx-auto h-max w-full max-w-3xl space-y-4 text-balance text-gray-500 *:text-center">
        <div>
          <h1 className="text-7xl">{message}</h1>
          <p className="text-2xl">Page Not Found</p>
        </div>
        <p className="mx-auto max-w-lg">{details}</p>
        <Link to="/" className="mx-auto block w-max p-1">
          Back to Homepage
        </Link>
      </div>
    </main>
  );
};
