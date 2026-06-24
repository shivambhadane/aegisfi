import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function DocsPage() {
  // Read the markdown file at build time
  const docPath = path.join(process.cwd(), "../docs/AEGIS-FI-Enterprise-Design.md");
  let content = "";
  try {
    content = fs.readFileSync(docPath, "utf-8");
  } catch (error) {
    content = "# Error\nCould not load documentation file. Please make sure `docs/AEGIS-FI-Enterprise-Design.md` exists.";
  }

  // Extract all H1 and H2 headings to build the sidebar navigation
  const headingRegex = /^(#{1,2})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      title: match[2],
      id: match[2].toLowerCase().replace(/[^\w\- ]+/g, '').replace(/\s+/g, '-'),
    });
  }

  return (
    <div className="flex flex-col md:flex-row gap-12 relative">
      
      {/* Sticky Sidebar */}
      <aside className="w-full md:w-64 lg:w-80 shrink-0 border-r border-[#222] pr-6 pb-20">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
          <div className="font-mono text-xs text-[#f04b36] mb-6 tracking-widest uppercase">
            // Architecture Index
          </div>
          <nav className="space-y-1">
            {headings.map((h, i) => (
              <a
                key={i}
                href={`#${h.id}`}
                className={`block py-1.5 text-sm transition-colors ${
                  h.level === 1 
                    ? "font-semibold text-white mt-4 border-t border-[#222] pt-4" 
                    : "text-[#888] hover:text-[#f04b36] pl-4"
                }`}
              >
                {h.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Markdown Content */}
      <main className="flex-1 min-w-0 max-w-4xl pb-32">
        <div className="font-mono text-xs text-[#666] mb-8 border-b border-[#222] pb-4">
          FILE: AEGIS-FI-Enterprise-Design.md | STATUS: SECURE | RENDERING: RIGID
        </div>
        
        <div className="markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => {
                const id = props.children?.toString().toLowerCase().replace(/[^\w\- ]+/g, '').replace(/\s+/g, '-');
                return <h1 id={id} className="text-4xl md:text-5xl font-medium tracking-tighter mt-16 mb-8 text-[#f04b36] pt-16 -mt-16" {...props} />
              },
              h2: ({node, ...props}) => {
                const id = props.children?.toString().toLowerCase().replace(/[^\w\- ]+/g, '').replace(/\s+/g, '-');
                return <h2 id={id} className="text-2xl md:text-3xl font-medium tracking-tight mt-12 mb-6 text-white pt-20 -mt-20 border-t border-[#222]/50" {...props} />
              },
              h3: ({node, ...props}) => <h3 className="text-xl font-medium tracking-tight mt-8 mb-4 text-[#dedede]" {...props} />,
              p: ({node, ...props}) => <p className="text-[#aaa] leading-relaxed mb-6" {...props} />,
              a: ({node, ...props}) => <a className="text-[#f04b36] hover:underline" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-6 text-[#aaa]" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-6 text-[#aaa]" {...props} />,
              li: ({node, ...props}) => <li className="pl-2" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-2 border-[#f04b36] pl-6 py-2 my-8 bg-[#f04b36]/5 text-white/90 italic" {...props} />
              ),
              code: ({node, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <div className="my-6 border border-[#333] bg-[#050505] rounded-sm overflow-hidden">
                    <div className="bg-[#111] px-4 py-2 border-b border-[#333] text-xs font-mono text-[#888] flex items-center gap-2 uppercase">
                      <span className="w-2 h-2 rounded-full bg-[#f04b36]"></span>
                      {match[1]}
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm font-mono text-[#ccc]">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="bg-[#222] text-[#f04b36] px-1.5 py-0.5 rounded-sm font-mono text-sm" {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({node, children, ...props}) => <>{children}</>,
              table: ({node, ...props}) => (
                <div className="overflow-x-auto mb-8 border border-[#333] rounded-sm">
                  <table className="w-full text-left text-sm text-[#aaa]" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="bg-[#111] text-white font-mono uppercase tracking-wider text-xs border-b border-[#333]" {...props} />,
              th: ({node, ...props}) => <th className="px-6 py-4 font-medium" {...props} />,
              td: ({node, ...props}) => <td className="px-6 py-4 border-b border-[#222]" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
