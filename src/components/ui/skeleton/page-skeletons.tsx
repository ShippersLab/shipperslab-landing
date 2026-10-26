import type { ReactNode } from "react";

import { Container } from "@/components/ui/section/container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";

function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto w-full max-w-content border-x border-border"
    >
      {children}
    </div>
  );
}

function TextLines({ lines, className }: { lines: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          className={index === lines - 1 ? "mt-3 h-4 w-2/3" : "mt-3 h-4 w-full first:mt-0"}
        />
      ))}
    </div>
  );
}

function HeroSkeleton({ wide }: { wide?: boolean }) {
  return (
    <div>
      <Container className="w-full py-24 sm:py-32 lg:py-40">
        <div className={wide ? "max-w-3xl" : "max-w-2xl"}>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-6 h-12 w-full sm:h-14" />
          <Skeleton className="mt-3 h-12 w-2/3 sm:h-14" />
          <TextLines lines={3} className="mt-6 max-w-xl" />
        </div>
      </Container>
    </div>
  );
}

function RowSkeleton({ lines }: { lines: number }) {
  return (
    <div className="mt-16 grid gap-6 border-t border-border pt-10 sm:mt-24 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <Skeleton className="h-8 w-48" />
      <TextLines lines={lines} className="max-w-2xl" />
    </div>
  );
}

export function ServicePageSkeleton() {
  return (
    <PageFrame>
      <HeroSkeleton />
      <Container className="w-full py-16 sm:py-20">
        <RowSkeleton lines={4} />
        <RowSkeleton lines={3} />
        <RowSkeleton lines={4} />
      </Container>
    </PageFrame>
  );
}

export function BlogIndexSkeleton() {
  return (
    <PageFrame>
      <Container className="py-20 sm:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <Skeleton className="h-12 w-3/4 sm:h-14" />
          <TextLines lines={2} className="mt-5 w-full" />
        </div>
      </Container>
      <Container className="w-full py-16 sm:py-20 md:py-28">
        <div className="grid gap-6">
          {[0, 1].map((item) => (
            <div key={item} className="max-w-2xl rounded-lg border border-border p-6 sm:p-8">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="mt-3 h-8 w-4/5" />
              <TextLines lines={3} className="mt-3" />
            </div>
          ))}
        </div>
      </Container>
    </PageFrame>
  );
}

export function BlogPostSkeleton() {
  return (
    <PageFrame>
      <HeroSkeleton wide />
      <Container className="w-full py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="hidden lg:block">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-4 w-40" />
            <Skeleton className="mt-3 h-4 w-36" />
            <Skeleton className="mt-3 h-4 w-44" />
          </div>
          <div className="max-w-2xl">
            <Skeleton className="h-32 w-full rounded-lg" />
            <TextLines lines={4} className="mt-10" />
            <Skeleton className="mt-14 h-8 w-2/3" />
            <TextLines lines={4} className="mt-6" />
          </div>
        </div>
      </Container>
    </PageFrame>
  );
}

export function CaseDetailSkeleton() {
  return (
    <PageFrame>
      <Container className="w-full py-20 sm:py-28">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="mt-10 h-4 w-40" />
        <Skeleton className="mt-4 h-14 w-2/3 sm:h-16" />
        <TextLines lines={2} className="mt-5 max-w-3xl" />
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item}>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="mt-2 h-5 w-28" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-16 aspect-video w-full rounded-lg sm:mt-24" />
        <RowSkeleton lines={3} />
      </Container>
    </PageFrame>
  );
}
