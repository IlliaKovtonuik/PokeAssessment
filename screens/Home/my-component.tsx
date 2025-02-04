"use dom";

export default function DOMComponent({ hello }: { hello: string }) {
  return <p>Hello, {hello}</p>;
}
