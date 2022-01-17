const ErrorMessage = ({ message }: { message: string }) => {
  return <span className="text-[11px] text-red-300">{message}</span>;
};

export default ErrorMessage;
