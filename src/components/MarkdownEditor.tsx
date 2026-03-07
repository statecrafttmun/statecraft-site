"use client";

import { renderMarkdown } from "@/utils/markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  rows = 10,
  placeholder,
}: MarkdownEditorProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3">
        {/* Write */}
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Write (Markdown)
          </div>
          <textarea
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-y font-mono text-sm"
            placeholder={placeholder}
          />
        </div>

        {/* Preview */}
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Preview
          </div>
          <div
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 overflow-y-auto prose prose-invert prose-sm max-w-none"
            style={{ minHeight: `${rows * 1.5 + 1}rem` }}
            dangerouslySetInnerHTML={{
              __html: value ? renderMarkdown(value) : '<p class="text-gray-600 italic">Preview will appear here...</p>',
            }}
          />
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Supports Markdown: **bold**, *italic*, # headings, - lists, [links](url), and more.
      </p>
    </div>
  );
}
