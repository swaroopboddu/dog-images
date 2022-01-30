import React, { useCallback, useRef } from "react";

interface BreedSelectProps {
  breeds: string[];
  onSelectCallback: (breed: string) => void;
  selectLabel: string;
  disabled: boolean
}

export const BreedSelect: React.FC<BreedSelectProps> = ({
  breeds,
  onSelectCallback,
  selectLabel,
  disabled,
}) => {
  const selectionRef = useRef<HTMLSelectElement>(null);

  const onSelectLocalCallback = useCallback(
    (e: React.SyntheticEvent) => {
      if (selectionRef.current) {
        onSelectCallback(selectionRef.current.value);
      }
    },
    [selectionRef, onSelectCallback]
  );

  return (
    <div className="selection-item">
      <label className="selection-label">{selectLabel}</label>
      <select
        name={selectLabel}
        ref={selectionRef}
        onChange={onSelectLocalCallback}
        disabled={!breeds || breeds.length <= 0 || disabled}
      >
        {breeds && breeds.length > 0 ? (breeds.map((breed, index) => (
          <option value={breed} key={index}>
            {breed}
          </option>
        ))):null}
      </select>
    </div>
  );
};
