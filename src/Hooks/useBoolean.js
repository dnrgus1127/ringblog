import { useCallback, useState } from "react";

export default function useBoolean(init = false) {
  const [value, setValue] = useState(init);
  const toggle = useCallback(() => setValue((value) => !value), []);

  return [value, toggle, setValue];
}
