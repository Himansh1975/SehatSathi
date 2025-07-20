export default function Section({ id, title, children }) {
  return (
    <div id={id} className="mb-20 scroll-mt-24">
      <div className="bg-white border text-center font-semibold text-lg py-2 rounded mb-6 shadow-sm">
        {title}
      </div>
      {children}
    </div>
  );
}