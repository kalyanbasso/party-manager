import { formatToCurrencyE2 } from "@/services/formatToCurrencyE2";

export type ItemType = {
  name: string;
  total: number;
  unit: number;
  id: string;
};

export type SummaryItemsProps = {
  items: ItemType[];
};

export const SummaryItems = (props: SummaryItemsProps) => {
  if (props.items.length === 0) return null;

  return (
    <div>
      {props.items.map((item) => (
        <div key={item.id} className="flex text-white justify-between">
          <p>
            {item.unit}x {item.name}
          </p>
          <p>{formatToCurrencyE2(item.total)}</p>
        </div>
      ))}
    </div>
  );
};
