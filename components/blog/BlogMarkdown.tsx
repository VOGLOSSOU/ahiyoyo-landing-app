"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Image from "next/image";

type BlogMarkdownProps = {
  children: string;
};

export default function BlogMarkdown({ children }: BlogMarkdownProps) {
  if (!children?.trim()) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        a({ node: _node, href, children, ...props }) {
          const external = /^https?:\/\//i.test(href || "");

          return (
            <a
              href={href}
              {...(external
                ? {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {})}
              {...props}
            >
              {children}
            </a>
          );
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        img({ node: _node, src, alt, ...props }) {
          if (!src) return null;

          return (
            <Image
              src={src}
              alt={alt || ""}
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              {...props}
            />
          );
        },
        h1({ children }) {
          return <h3>{children}</h3>;
        },
        h2({ children }) {
          return <h3>{children}</h3>;
        },
        table({ children }) {
          return <div className="table-wrapper">{children}</div>;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
