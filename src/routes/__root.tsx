import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Zero Furo — Seu caminho mais seguro" },
      {
        name: "description",
        content:
          "Selante Zero Furo e Compressor de Ar Portátil 3 em 1: proteção e praticidade para nunca mais ficar na mão com pneu furado.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Zero Furo" },
      { property: "og:title", content: "Zero Furo — Seu caminho mais seguro" },
      {
        property: "og:description",
        content:
          "Selante Zero Furo e Compressor de Ar Portátil 3 em 1: proteção e praticidade para nunca mais ficar na mão com pneu furado.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Only the weights actually used across the app — cuts font payload by ~50%.
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const META_PIXEL_ID = "1586417186407271";

type MarketingWindow = Window & {
  fbq?: ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue?: unknown[];
    loaded?: boolean;
    version?: string;
    push?: (...args: unknown[]) => void;
  };
  _fbq?: unknown;
  pixelId?: string;
  __zeroFuroMetaReady?: boolean;
  __zeroFuroUtmifyReady?: boolean;
};

function appendExternalScript(id: string, src: string, attrs: Record<string, string> = {}) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  script.defer = true;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
}

function initializeMarketingScripts() {
  if (typeof window === "undefined") return;
  const w = window as MarketingWindow;

  if (!w.__zeroFuroMetaReady) {
    if (!w.fbq) {
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue?.push(args);
      } as NonNullable<MarketingWindow["fbq"]>;
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      w.fbq = fbq;
      w._fbq = fbq;
    }
    appendExternalScript(
      "zerofuro-meta-pixel",
      "https://connect.facebook.net/en_US/fbevents.js",
    );
    w.fbq("init", META_PIXEL_ID);
    w.fbq("track", "PageView");
    w.__zeroFuroMetaReady = true;
  }

  if (!w.__zeroFuroUtmifyReady) {
    const utmifyPixelId = (import.meta.env.VITE_UTMIFY_PIXEL_ID as string | undefined) || "";
    if (utmifyPixelId && !w.pixelId) w.pixelId = utmifyPixelId;
    appendExternalScript("zerofuro-utmify-pixel", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
    appendExternalScript("zerofuro-utmify-utms", "https://cdn.utmify.com.br/scripts/utms/latest.js", {
      "data-utmify-prevent-xcod-sck": "",
      "data-utmify-prevent-subids": "",
    });
    w.__zeroFuroUtmifyReady = true;
  }
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <HeadContent />
      </head>

      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    initializeMarketingScripts();
    // Captura utm_source, utm_campaign, src, sck... na primeira visita.
    import("../lib/tracking").then((m) => m.captureTracking()).catch(() => {});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
