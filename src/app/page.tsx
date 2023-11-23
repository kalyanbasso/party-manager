"use client";
import { PaymentMethod, PaymentMethods } from "./components/paymentsMethod";
import { useState } from "react";
import { formatToCurrencyE2 } from "@/services/formatToCurrencyE2";
import { Item } from "./components/item";
import { SummaryItems, ItemType } from "./components/summaryItems";

const ITEMS_DEFAULT = [
  {
    id: "water",
    name: "Água",
    price: 250,
  },
  {
    id: "coke",
    name: "Refrigerante",
    price: 300,
  },
  {
    id: "beer",
    name: "Cerveja",
    price: 500,
  },
];

export default function Home() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>("money");
  const [change, setChange] = useState<string>("");
  const [difference, setDifference] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [itemsSelected, setItemsSelected] = useState<ItemType[]>([]);

  const [items, setItems] = useState(ITEMS_DEFAULT);

  const handleSelectPaymentMethod = (id: PaymentMethods) => {
    setChange("");

    if (total > 0 && id === "money") setDifference(-total);
    else setDifference(0);

    setPaymentMethod(id);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const onlyNumbers = Number(value.replace(/[^0-9]/g, ""));

    setChange(formatToCurrencyE2(onlyNumbers));

    setDifference(onlyNumbers - total);
  };

  const handleSubmit = () => {
    setTotal(0);
    setDifference(0);
    setChange("");
    setItemsSelected([]);
  };

  const handleAddItem = (id: string) => {
    const itemHasSelected = itemsSelected.find((item) => item.id === id);
    const itemExist = items.find((item) => item.id === id);

    if (!itemExist) return;

    setTotal((prev) => prev + itemExist.price);

    if (itemHasSelected) {
      const newItemsSelected = itemsSelected.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            total: item.total + itemExist.price,
            unit: item.unit + 1,
          };
        }

        return item;
      });
      setItemsSelected(newItemsSelected);
    } else {
      setItemsSelected([
        ...itemsSelected,
        {
          id: id,
          name: itemExist.name,
          total: itemExist.price,
          unit: 1,
        },
      ]);
    }
  };

  const handleRemoveItem = (id: string) => {
    const itemHasSelected = itemsSelected.find((item) => item.id === id);
    const itemExist = items.find((item) => item.id === id);

    if (!itemExist) return;

    if (itemHasSelected) {
      setTotal((prev) => prev - itemExist.price);

      if (itemHasSelected.unit === 1) {
        const newItemsSelected = itemsSelected.filter((item) => item.id !== id);

        setItemsSelected(newItemsSelected);
      } else {
        const newItemsSelected = itemsSelected.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              total: item.total - itemExist.price,
              unit: item.unit - 1,
            };
          }

          return item;
        });

        setItemsSelected(newItemsSelected);
      }
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-24">
      <div className="bg-white flex rounded-lg h-5/6 w-full p-12">
        <div className="h-full flex-1 flex flex-col gap-4">
          {items.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              price={formatToCurrencyE2(item.price)}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </div>

        <div className="h-full rounded-lg bg-gray-800 flex flex-col justify-between p-4">
          <div className="flex flex-col">
            <p className="text-white font-bold text-xl mt-4">
              Forma de pagamento
            </p>
            <div className="flex gap-4 mt-4">
              <PaymentMethod
                handleSelect={handleSelectPaymentMethod}
                id="pix"
                name="Pix"
                selected={paymentMethod === "pix"}
              />
              <PaymentMethod
                handleSelect={handleSelectPaymentMethod}
                id="money"
                name="Dinheiro"
                selected={paymentMethod === "money"}
              />
              <PaymentMethod
                handleSelect={handleSelectPaymentMethod}
                id="credit-card"
                name="Crédito"
                selected={paymentMethod === "credit-card"}
              />
              <PaymentMethod
                handleSelect={handleSelectPaymentMethod}
                id="debit-card"
                name="Débito"
                selected={paymentMethod === "debit-card"}
              />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <p className="text-white font-bold">Resumo</p>
              <div>
                <SummaryItems items={itemsSelected} />
              </div>
              <div className="flex text-white justify-between">
                <p className="text-2xl font-semibold">Total</p>
                <p className="text-2xl font-semibold">
                  {formatToCurrencyE2(total)}
                </p>
              </div>
              {paymentMethod === "money" && (
                <div className="flex flex-col gap-4">
                  <p className="text-white font-semibold">Troco para</p>
                  <input
                    className="rounded-lg p-2 text-end"
                    placeholder="R$ 0,00"
                    value={change}
                    onChange={handleInputChange}
                  />
                  <div className="flex text-white justify-between">
                    <p className="text-2xl font-semibold">
                      {difference < 0 ? "Falta" : "Troco"}
                    </p>
                    <p className="text-2xl font-semibold">
                      {formatToCurrencyE2(difference)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            disabled={difference < 0}
            onClick={handleSubmit}
            className={`${
              difference < 0 ? "bg-gray-400" : "bg-green-400 hover:bg-green-300"
            } text-white rounded-lg py-2`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </main>
  );
}
