'use client';
import React, {useState, useEffect} from "react";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  query$napshot, 
  query, 
  onSnapshot, 
  deleteDoc,
  doc,
 } from 'firebase/firestore';
import {db} from './firebase';
//import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';

export default function Home() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({name: '', quantity: ''})
  const [total, setTotal] = useState(0)

  //add item to database
  const addItem = async(e) => {
    e.preventDefault()
    if (newItem.name !== '' && newItem.quantity !== '') {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
      });
      setNewItem({name: '', quantity: ''})
    }
  }

  //read items from database
  useEffect(() => {
    const q =query(collection(db, 'items'))
    const unsubsrcibe = onSnapshot(q, (querySnapshot) => {
      let itemsArray = []

      querySnapshot.forEach((doc) => {
        itemsArray.push({...doc.data(), id: doc.id})
      })
      setItems(itemsArray);

      //reading from intemsArray to get total
      const calculateTotal = () => {
        const totalquantity = itemsArray.reduce((sum, item) => sum + parseFloat(item.quantity), 0)
        setTotal(totalquantity)
      }
      calculateTotal()
      return () => unsubsrcibe()
    });
  }, [])

  //delete item from database
  const deleteItem = async(id) => {
    await deleteDoc(doc(db, 'items', id))
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-7xl p-4 text-center'>Pantry Tracker</h1>
        <div className = 'bg-slate-800 p-4 rounded-lg'> 
          <form className='grid grid-cols-6 items-center text-black'>
            <input 
              value = {newItem.name}
              onChange = {(e) => setNewItem({...newItem, name: e.target.value})}
              className = 'col-span-3 p-3 border rounded-md' 
              type="text" 
              placeholder = 'Enter Name Of Item' 
            />
            <input 
              value = {newItem.quantity}
              onChange = {(e) => setNewItem({...newItem, quantity: e.target.value})}
              className = 'col-span-2 p-3 border mx-3 rounded-md'
              type="number" 
              placeholder = 'Enter Quantity'
            />
            <button 
            onClick = {addItem}
            className = 'text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl rounded-xl' 
            type = "submit">
              add
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className='my-4 w-full flex justify-between bg-slate-950'
              >
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                >
                  x
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ?('') : (
            <div className='flex justify-between p-3'>
              <span>Total number of items in Pantry : </span>
              <span>{total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


// //Material UI version:

// 'use client';
// import React, { useState, useEffect, use } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   addDoc,
//   query,
//   onSnapshot,
//   deleteDoc,
//   doc,
// } from 'firebase/firestore';
// import { db } from './firebase';
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Container,
//   TextField,
//   Button,
//   AppBar,
//   Toolbar,
//   ListItemSecondaryAction,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// export default function Home() {
//   const [items, setItems] = useState([]);
//   const [newItem, setNewItem] = useState({ name: '', quantity: '' });
//   const [total, setTotal] = useState(0);

//   // Add item to database
//   const addItem = async (e) => {
//     e.preventDefault();
//     if (newItem.name !== '' && newItem.quantity !== '') {
//       await addDoc(collection(db, 'items'), {
//         name: newItem.name.trim(),
//         quantity: newItem.quantity,
//       });
//       setNewItem({ name: '', quantity: '' });
//     }
//   };

//   // Read items from database
//   useEffect(() => {
//     const q = query(collection(db, 'items'));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let itemsArray = [];
//       querySnapshot.forEach((doc) => {
//         itemsArray.push({ ...doc.data(), id: doc.id });
//       });
//       setItems(itemsArray);

//       // Calculate total quantity
//       const calculateTotal = () => {
//         const totalQuantity = itemsArray.reduce((sum, item) => sum + parseFloat(item.quantity), 0);
//         setTotal(totalQuantity);
//       };
//       calculateTotal();
//     });

//     return () => unsubscribe();
//   }, []);

//   // Delete item from database
//   const deleteItem = async (id) => {
//     await deleteDoc(doc(db, 'items', id));
//   };

//   return (
//     <Container>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Pantry Tracker
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Pantry Tracker
//         </Typography>
//         <Box component="form" onSubmit={addItem} sx={{ display: 'flex', mb: 2 }}>
//           <TextField
//             value={newItem.name}
//             onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//             label="Enter item"
//             variant="outlined"
//             sx={{ mr: 2, flex: 3 }}
//           />
//           <TextField
//             value={newItem.quantity}
//             onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
//             label="Enter quantity"
//             variant="outlined"
//             type="number"
//             sx={{ mr: 2, flex: 2 }}
//           />
//           <Button type="submit" variant="contained" color="primary">
//             Add
//           </Button>
//         </Box>
//         <List>
//           {items.map((item) => (
//             <ListItem key={item.id} sx={{ bgcolor: 'background.default', mb: 1 }}>
//               <ListItemText
//                 primary={item.name}
//                 secondary={`Quantity: ${item.quantity}`}
//               />
//               <ListItemSecondaryAction>
//                 <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItemSecondaryAction>
//             </ListItem>
//           ))}
//         </List>
//         {items.length > 0 && (
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Typography variant="h6">Total</Typography>
//             <Typography variant="h6">{total}</Typography>
//           </Box>
//         )}
//       </Box>
//     </Container>
//   );
// }

