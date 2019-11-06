import React, { useMemo, useCallback, useState } from 'react';
import {
   GET_AUTHORS_QUERY,
   ADD_BOOK_MUTATION,
   GET_BOOKS_QUERY
} from '../queries/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';

const getOptions = (loading, error, data) => {
   if (loading) {
      return <option disabled>Loading Authors...</option>;
   } else if (error) {
      return <option disabled>Error loading Authors</option>;
   } else {
      return data.authors.map(({ name, id }) => {
         return (
            <option key={id} value={id}>
               {name}
            </option>
         );
      });
   }
};

const AddBook = () => {
   const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
   const [addBook] = useMutation(ADD_BOOK_MUTATION);
   const [name, setName] = useState('');
   const [genre, setGenre] = useState('');
   const [authorId, setAuthor] = useState('');

   const options = useMemo(() => getOptions(loading, error, data), [
      loading,
      error,
      data
   ]);

   const nameCB = useCallback(e => setName(e.target.value), []);
   const genreCB = useCallback(e => setGenre(e.target.value), []);
   const authorCB = useCallback(e => setAuthor(e.target.value), []);
   const addCB = useCallback(
      e => {
         e.preventDefault();
         addBook({
            variables: {
               name,
               genre,
               authorId
            },
            refetchQueries: [{ query: GET_BOOKS_QUERY }]
         });
      },
      [name, genre, authorId, addBook]
   );

   return (
      <form id="add-book" onSubmit={addCB}>
         <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={nameCB} />
         </div>

         <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={genreCB} />
         </div>

         <div className="field">
            <label>Author:</label>
            <select onChange={authorCB}>
               <option>Select Author</option>
               {options}
            </select>
         </div>

         <button>+</button>
      </form>
   );
};

export default AddBook;
