function EmptyState({
  title = "No donations found",
  message = "You haven't added any donations yet.",
  action,
}) {
  return (
    <div className="rounded-xl bg-white p-10 text-center shadow">

      <div className="text-5xl">
        🍽️
      </div>

      <h2 className="mt-4 text-xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {message}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          {action.label}
        </button>
      )}

    </div>
  );
}

export default EmptyState;