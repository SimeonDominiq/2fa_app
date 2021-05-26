// Input.tsx
import * as React from "react";
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
const Input = ({ error, ...rest }: InputProps) => (
  <>
    <input {...rest} />
    {error && <div>{error}</div>}
  </>
);

export default Input