import { marked } from "marked";

export const renderer = new marked.Renderer();

renderer.heading = (text, level): string => {
  switch (level) {
    case 2: {
      return `<h2 class="text-lg font-bold mt-5 text-violet-900">${text}</h2>`;
    }
      
    default: return `<h${level}>${text}</h${level}>`;
  }
}

renderer.list = (body): string => {
  return `<ul class="list-disc list-inside mx-5 mt-1">${body}</ul>`
}

renderer.link = (href, title, text) => {
  return `<a href="${href}" class="text-blue-400 hover:underline hover:text-blue-500" ${title ? `title="${title}` : ""}>${text}</a>`
}

export const createMarkUp = (val: string) => {
  return { __html: marked(val, { renderer: renderer }) }
}