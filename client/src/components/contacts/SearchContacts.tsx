import { RiCloseFill } from 'react-icons/ri';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { contactsState } from 'src/recoil/contacts';
import { searchInputState } from 'src/recoil/searchInput';
import { User } from 'src/interfaces';


interface Props {
  contacts: User[]
}

const SearchContacts = ({contacts}: Props) => {
  const [searchInputValue, setSearchInputValue] = useRecoilState(searchInputState);
  const resetSearchInput = useResetRecoilState(searchInputState);
  const setSearchedContacts = useSetRecoilState(contactsState);
  const resetSearchedContacts = useResetRecoilState(contactsState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchInputValue(searchValue);
    const searchedContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchValue.toLowerCase()));
    setSearchedContacts(searchValue ? searchedContacts : [])
  };

  const handleClear = () => {
    resetSearchInput();
    resetSearchedContacts();
  }

  return (
    <div className="flex items-center border-b-[1px] border-gray-500 pr-1">
      <input
       type="text"
       placeholder="Search" 
       value={searchInputValue}
       onChange={handleChange}
       className="py-[6px] px-2 text-[15px] bg-secondary outline-none grow" 
      />
      {searchInputValue && <RiCloseFill className="text-lg cursor-pointer" onClick={handleClear} />}
    </div>
  )
}



export default SearchContacts
