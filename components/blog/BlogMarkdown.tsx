"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

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
            // Markdown can reference several trusted publishing hosts, which
            // cannot all be known by Next Image at build time.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt || ""}
              loading="lazy"
              decoding="async"
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
        table({ children, ...props }) {
          return (
            <div className="table-wrapper">
              <table {...props}>{children}</table>
            </div>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
