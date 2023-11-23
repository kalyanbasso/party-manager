"use client";

export type PaymentMethods = "pix" | "money" | "credit-card" | "debit-card";

export type PaymentMethodProps = {
  name: string;
  selected: boolean;
  id: PaymentMethods;
  handleSelect: (id: PaymentMethods) => void;
};

export const PaymentMethod = (props: PaymentMethodProps) => {
  return (
    <div
      onClick={() => props.handleSelect(props.id)}
      className={`${
        props.selected ? "bg-gray-300" : "bg-gray-600 hover:bg-gray-400"
      } py-3 cursor-pointer px-2 rounded-lg w-20 text-center`}
    >
      <span
        className={`${
          props.selected ? "text-gray-800" : "text-white"
        }  select-none`}
      >
        {props.name}
      </span>
    </div>
  );
};
