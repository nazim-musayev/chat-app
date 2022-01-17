import NoContactsOrError from "src/components/contacts/NoContactsOrError";
import ContactsList from "src/components/contacts/ContactsList";
import SearchInput from "src/components/contacts/SearchInput";
import Skeleton from "src/components/contacts/Skeleton";
import Header from "src/components/contacts/Header";
import { User as SessionUser } from "next-auth";
import { useRecoilValueLoadable } from "recoil";
import { contactsState } from "src/recoil/contacts";


interface Props {
  sessionUser: SessionUser;
};

const Main = ({ sessionUser }: Props) => {
  const getUsersQuery = useRecoilValueLoadable(contactsState);

  return (
    <div className="relative h-full flex flex-col space-y-8 pb-6">
      <Header sessionUser={sessionUser} />
      <div className="px-5">
        <SearchInput />
      </div>
      {getUsersQuery.state === "loading" && (
        Array.from([1, 2, 3, 4]).map((item, index) => <Skeleton key={index} />)
      )}
      {getUsersQuery.state === "hasError" && <NoContactsOrError message="Cannot fetch data right now" />}
      {getUsersQuery.state === "hasValue" && (
        <ContactsList sessionUser={sessionUser} contacts={getUsersQuery.contents} />
      )}
    </div>
  );
};

export default Main;
