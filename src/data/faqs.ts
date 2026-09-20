import type { FAQItem } from '@/types';

export const homeFAQs: FAQItem[] = [
  {
    question: 'Do I need to create an account to use these tools?',
    answer: 'No. Ultimate Tools requires no signup, no login, and no account. Every tool is available to use immediately.',
  },
  {
    question: 'Are my files uploaded to a server?',
    answer: 'No. All file processing happens locally in your browser. Your images, text, and data never leave your device.',
  },
  {
    question: 'Is Ultimate Tools free to use?',
    answer: 'Yes. All tools are completely free. The site may display ads in the future to support development, but the tools themselves will always be free.',
  },
  {
    question: 'Do the tools work on mobile devices?',
    answer: 'Yes. The entire site is responsive and every tool is designed to work comfortably on phones, tablets, and desktops.',
  },
  {
    question: 'How many tools are available?',
    answer: 'We are launching with 5 fully functional tools and will be expanding to 100+ tools over time. The architecture is built to scale.',
  },
  {
    question: 'Do you store any of my data?',
    answer: 'No. We do not use server-side databases for tool processing. Everything runs in your browser. We do not track your tool usage.',
  },
];

export const categoryFAQs: Record<string, FAQItem[]> = {
  image: [
    {
      question: 'Is the image compressor safe to use for sensitive images?',
      answer: 'Yes. The compression happens entirely in your browser using Canvas APIs. Your image is never uploaded to any server.',
    },
    {
      question: 'What image formats are supported?',
      answer: 'JPEG, PNG, and WebP are supported in most modern browsers. The output format matches or is compatible with your input.',
    },
  ],
  text: [
    {
      question: 'Does the word counter work offline?',
      answer: 'Once the page is loaded, the word counter processes everything locally. It works without an internet connection.',
    },
    {
      question: 'Is there a character limit?',
      answer: 'There is no hard limit. The tool can handle very large text documents, processing counts instantly as you type.',
    },
  ],
  developer: [
    {
      question: 'What happens if my JSON is invalid?',
      answer: 'The tool shows a clear error message explaining what went wrong and where. It never crashes — you can fix and retry.',
    },
    {
      question: 'Can I minify JSON too?',
      answer: 'Yes. You can both beautify (format) and minify JSON with a single click, and choose your preferred indentation level.',
    },
  ],
  security: [
    {
      question: 'How secure is the password generator?',
      answer: 'It uses the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers — far safer than Math.random().',
    },
    {
      question: 'Are generated passwords stored anywhere?',
      answer: 'No. Generated passwords exist only in your browser and are never stored or transmitted. Copy it where you need it.',
    },
  ],
  calculator: [
    {
      question: 'Are the calculations accurate?',
      answer: 'Yes. All calculations use standard JavaScript arithmetic and are processed locally. Results are instant and accurate.',
    },
    {
      question: 'Can I use this for financial calculations?',
      answer: 'The percentage calculator handles common percentage operations. For complex financial decisions, consult a professional.',
    },
  ],
  document: [
    {
      question: 'Can I merge PDF files in my browser?',
      answer: 'Document tools are coming soon. The architecture supports browser-based PDF processing without uploads.',
    },
  ],
  color: [
    {
      question: 'What color tools are available?',
      answer: 'Color tools are coming soon. The architecture supports palette generators, color format converters, and more.',
    },
  ],
  data: [
    {
      question: 'What data formats are supported?',
      answer: 'Data tools are coming soon. The architecture is ready for CSV/JSON conversion, data formatting, and structured data manipulation.',
    },
  ],
};

export const aboutFAQs: FAQItem[] = [
  {
    question: 'What is Ultimate Tools?',
    answer: 'Ultimate Tools is a collection of browser-based utilities designed to make everyday digital tasks faster and easier.',
  },
  {
    question: 'Why browser-based?',
    answer: 'Processing in the browser means your data stays private, tools are fast, and you do not need to wait for server round trips.',
  },
];
