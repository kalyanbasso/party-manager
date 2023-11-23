export type ItemProps = {
  name: string;
  price: string;
  id: string;
  handleAddItem: (id: string) => void;
  handleRemoveItem: (id: string) => void;
};

export const Item = (props: ItemProps) => {
  return (
    <div className="h-28 w-72 rounded-lg bg-gray-800 cursor-pointer flex items-center justify-between px-8 gap-4">
      <div>
        <p className="text-white select-none font-bold">{props.name}</p>
        <p className="text-white select-none font-bold">{props.price}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => props.handleAddItem(props.id)}
          className="bg-green-500 hover:bg-green-600 rounded-lg px-4 py-1 text-white"
        >
          +
        </button>
        <button
          onClick={() => props.handleRemoveItem(props.id)}
          className="bg-red-500 hover:bg-red-600 rounded-lg px-4 py-1 text-white"
        >
          -
        </button>
      </div>
    </div>
  );
};
