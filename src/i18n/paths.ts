import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";

const EXTERNAL = /^([a-z][a-z0-9+.-]*:|\/\/)/i;

function splitSuffix(path: string) {
  const index = path.search(/[?#]/);
  return index === -1
    ? { pathname: path, suffix: "" }
    : { pathname: path.slice(0, index), suffix: path.slice(index) };
}

export function stripLocale(pathname: string) {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

export function localizePath(path: string, lang: Locale) {
  if (!path.startsWith("/") || EXTERNAL.test(path)) return path;

  const { pathname, suffix } = splitSuffix(path);
  const bare = stripLocale(pathname);

  if (lang === defaultLocale) return `${bare}${suffix}`;
  return `${bare === "/" ? `/${lang}` : `/${lang}${bare}`}${suffix}`;
}

export function localizedUrl(path: string, lang: Locale) {
  const localized = localizePath(path, lang);
  return localized === "/" ? site.url : `${site.url}${localized}`;
}

export function languageAlternates(path: string) {
  return {
    es: localizedUrl(path, "es"),
    en: localizedUrl(path, "en"),
    "x-default": localizedUrl(path, defaultLocale),
  };
}
