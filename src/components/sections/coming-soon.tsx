import Image from "next/image";

const BACKGROUND_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtdJvft1ms25ScANj+9jk0/UbwWNpJOy52oSo9SB0/z6V5ToWt3ujzN9jZdsn3kcbh/nmrOteJdS1OLyJ3RIwc7Y1257Ujc//Z";

export function ComingSoon() {
  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden">
      <Image
        src="/images/building-illustration.webp"
        alt="Ilustración estilo serigrafía de grúas portuarias sobre un astillero, en tonos negro, naranja y rosa"
        fill
        priority
        quality={80}
        placeholder="blur"
        blurDataURL={BACKGROUND_BLUR_DATA_URL}
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
        <h1 className="text-grain font-heading text-2xl tracking-tighter opacity-90 sm:text-3xl md:text-4xl">
          En construcción.
        </h1>
        <a
          href="mailto:hola@shipperslab.tech"
          className="font-mono text-sm text-accent transition-opacity duration-300 hover:opacity-70"
        >
          hola@shipperslab.tech
        </a>
      </div>
    </section>
  );
}
