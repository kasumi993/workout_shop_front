import { useState } from "react"
import Button from "./Button"
import { CloseSvg } from "./CloseSvg"
import Input from "./Input"
import { HiOutlineFunnel, HiOutlineMagnifyingGlass } from "react-icons/hi2"

export default function FiltersAndSearch() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="mb-25 flex items-end justify-center gap-6">
        <Button className="px-5 py-4 rounded-lg bg-black text-white cursor-pointer">
          Tous les produits
        </Button>

      <div className='w-[60%]'>
        <Input
            name="SearchBar"
            placeholder={`Chercher...`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            suffix={
              searchValue.length > 0 ? (
                <CloseSvg
                  onClick={() => setSearchValue("")}
                  height={24}
                  width={24}
                  fillColor="#000000ff"
                />
              ) : (
                <HiOutlineMagnifyingGlass/>
              )
            }
            className="h-[54px] justify-center rounded-lg border border-solid border-gray-300 text-[21px]"
          />
      </div>

        <Button
          leftIcon={
            <HiOutlineFunnel/>
          }
          className="flex h-[50px] min-w-[114px] flex-row items-center justify-center gap-0.5 rounded-lg bg-gray-100 px-5 text-center font-inter text-[18px] font-medium text-black_900"
        >
          Filtres
        </Button>
      </div>
    )
}