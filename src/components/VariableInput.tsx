interface VariableInputProps {
  count: number;
  unit: string;
  onChange: (count: number) => void;
}

export default function VariableInput({ count, unit, onChange }: VariableInputProps) {
  return (
    <div className="variable-input">
      <button
        className="stepper-btn"
        onClick={(e) => { e.stopPropagation(); onChange(count - 1); }}
        disabled={count <= 0}
        aria-label={`Decrease ${unit} count`}
      >
        −
      </button>
      <span className="stepper-count">
        {count} {unit}{count !== 1 ? "s" : ""}
      </span>
      <button
        className="stepper-btn"
        onClick={(e) => { e.stopPropagation(); onChange(count + 1); }}
        aria-label={`Increase ${unit} count`}
      >
        +
      </button>
    </div>
  );
}
