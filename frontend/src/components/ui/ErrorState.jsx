function ErrorState({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="rounded-xl bg-white p-10 text-center shadow">
      <div className="text-4xl">
        ⚠️
      </div>

      <h2 className="mt-4 text-xl font-bold text-red-600">
        Something went wrong
      </h2>

      <p className="mt-2 text-gray-500">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;