function FloatingAddButton({ openForm }) {
  return (
    <button
      onClick={openForm}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-14 h-14 rounded-full shadow-xl hover:scale-110 transition text-2xl"
    >
      +
    </button>
  );
}

export default FloatingAddButton;
