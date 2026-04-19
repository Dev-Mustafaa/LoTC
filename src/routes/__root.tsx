import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AppProvider } from "@/context/AppContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "İstanbul Öğrenci Rehberi" },
      { name: "description", content: "İstanbul Öğrenci Rehberi, şehre yeni taşınan üniversite öğrencileri için kapsamlı bir mobil uygulamadır." },
      { name: "author", content: "ASA" },
      { property: "og:title", content: "İstanbul Öğrenci Rehberi" },
      { property: "og:description", content: "İstanbul Öğrenci Rehberi, şehre yeni taşınan üniversite öğrencileri için kapsamlı bir mobil uygulamadır." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "İstanbul Öğrenci Rehberi" },
      { name: "twitter:description", content: "İstanbul Öğrenci Rehberi, şehre yeni taşınan üniversite öğrencileri için kapsamlı bir mobil uygulamadır." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/54090fde-7eb6-422d-8252-8727f3db80b8/id-preview-e8bc02a7--4512e99a-844e-481b-ba03-f2ec04a6ac92.lovable.app-1776522232835.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/54090fde-7eb6-422d-8252-8727f3db80b8/id-preview-e8bc02a7--4512e99a-844e-481b-ba03-f2ec04a6ac92.lovable.app-1776522232835.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
