function ErrorMessage({ message }: { message: string }) {
  return <span className="text-red-500 text-sm font-semibold">{message}</span>;
}

export default ErrorMessage;
