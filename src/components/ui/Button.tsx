export default function Button({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-brand text-black font-semibold px-4 py-2 rounded-lg shadow hover:scale-105 transition"
    >
      {children}
    </button>
  );
}