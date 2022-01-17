import { selector } from "recoil";
import { getSession } from "next-auth/react";
import client from "src/apollo/client";
import { QUERY_USERS } from "src/apollo/queries";
import { User, UsersData } from "src/interfaces";
import { searchInputState } from "src/recoil/searchInput";


interface Variables {
  id: string;
};

export const contactsState = selector<User[]>({
  key: "contactsState",
  get: async () => {
    const session = await getSession();
    const { data } = await client.query<UsersData, Variables>({
      query: QUERY_USERS,
      variables: {
        id: session?.user.id!
      }
    })
    return data.users;
  }
});

export const searchedContactsState = selector<User[]>({
  key: "searchedContactsState",
  get: ({ get }) => {
    const searchValue = get(searchInputState);
    const contacts = get(contactsState);
    const searchedContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return searchValue ? searchedContacts : [];
  }
});
