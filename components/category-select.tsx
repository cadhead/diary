import { ChangeEventHandler } from "react";

type Props = {
  categories: string[],
  onFieldChange: ChangeEventHandler
}

export default function CategorySelect({ categories, onFieldChange }: Props) {
  return (
    <select className="w-full h-16 max-w-screen-sm px-2 mt-1 font-bold text-gray-400 bg-gray-100 border-transparent rounded-md focus:border-gray-300" name="category" onChange={onFieldChange}>
      <option disabled>Choose category</option>
      <option>No category</option>
      {categories.map((cat) => <option className="text-black" key={cat} value={cat}>{cat}</option>)}
    </select>
  );
}
