type SelectOptionsProps = {
  options: readonly string[];
};

export function SelectOptions({ options }: SelectOptionsProps) {
  return options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
}
