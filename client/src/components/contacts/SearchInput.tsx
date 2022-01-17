import { RiCloseFill } from "react-icons/ri";
import { useRecoilState, useResetRecoilState } from "recoil";
import { searchInputState } from "src/recoil/searchInput";
import MotionX from "src/components/shared/MotionX";

const SearchInput = () => {
  const [searchInputValue, setSearchInputValue] = useRecoilState(searchInputState);
  const resetSearchInput = useResetRecoilState(searchInputState);

  return (
    <div className="flex items-center border-b-[1px] border-gray-500 pr-1">
      <input
       type="text"
       placeholder="Search"
       value={searchInputValue}
       onChange={(e) => setSearchInputValue(e.target.value)}
       className="py-[6px] px-2 text-[15px] bg-secondary outline-none grow"
      />
      {searchInputValue && (
        <MotionX>
          <RiCloseFill
           className="text-lg cursor-pointer"
           onClick={() => resetSearchInput()}
          />
        </MotionX>
      )}
    </div>
  );
};

export default SearchInput;
