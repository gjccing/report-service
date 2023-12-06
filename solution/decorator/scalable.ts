export default function scalable<T extends Function>(path: string): T {
  return require(path).default;
}
