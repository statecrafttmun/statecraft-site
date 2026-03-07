import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: false, // Disable raw HTML for security
  linkify: true, // Auto-link URLs
  breaks: true, // Convert \n to <br>
  typographer: true, // Smart quotes, dashes, etc.
});

export function renderMarkdown(content: string): string {
  if (!content) return "";
  return md.render(content);
}

export default md;
