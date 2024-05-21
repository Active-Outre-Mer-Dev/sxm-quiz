type PropTypes = {
  content: string;
};
export function RenderMarkdown({ content }: PropTypes) {
  return (
    <div
      className={` prose-img:border prose-img:rounded-md prose-img:border-gray-100 prose-ul:list-disc prose-p:mb-4 
        prose-headings:font-medium prose-headings:mb-4 prose-h2:mt-12 
        prose-headings:font-heading prose-h2:text-4xl prose-ul:pl-4 text-lg prose-ul:mb-4 prose-a:text-primary-500 prose-a:underline
        prose-a:dark:text-primary-200 prose-img:dark:border-gray-700 prose-ol:pl-4 prose-ol:list-decimal`}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}
