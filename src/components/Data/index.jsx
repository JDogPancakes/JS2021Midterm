import React, { useEffect,useMemo,useState,setOrder } from 'react';
import Header from '../shared/Header';
import axios from 'axios';

const Data = () => {
  const APILINK = 'https://jsonplaceholder.typicode.com/posts';
  var order = true;
  const setOrder = (yes) => {
    order = yes;
  }
  const [data,setData] = useState([]);
  const posts = useMemo(()=> data, [data]);
  useEffect(() => {axios.get('https://jsonplaceholder.typicode.com/posts').then(resp => {setData(resp.data)});
  },[]);
  


   const filter = event => {
     event.persist();
     const value = event.target.value;
     axios.get(APILINK).then(resp =>{

     if (value.length === 0) {
       setData([...resp.data]);
     } else if (isNaN(value)) {
       const regex = new RegExp(value);
       setData([...resp.data.filter(datum => (regex.test(datum.title) || regex.test(datum.body)))]);
     } else {
       const num = Number(value);
       setData([...resp.data.filter(datum => (Number(datum.userId) === num || Number(datum.id) === num))]);
     }
    })
   };

  //  const sort = event => {
  //    event.persist();
  //    const { name, type } = event.target.dataset;
    
  //    let sorted;
  //    if (type === "int")
  //      sorted = data.sort((a, b) => Number(a[name]) - Number(b[name]));
  //    else
  //      sorted = data.sort((a, b) => {
  //        if (a[name].toLowerCase() < b[name].toLowerCase()) return -1;
  //        if (a[name].toLowerCase() > b[name].toLowerCase()) return 1;
  //        return 0;
  //      });

  //    if (order) {
  //      sorted = sorted.reverse();
  //      setOrder(false);
  //    } else {
  //      setOrder(true);
  //    }

  //    setData([...sorted]);
  //  };

  return (
    <>
      <div className="container-fluid">
        <Header title="Your Data"/>
      </div>

      <div className="container">
        <h2>Data Table</h2>
        <hr/>
        
        <div className="row my-3 align-items-center justify-content-end">
          <div className="col-auto">
            <label htmlFor="filter" className="col-form-label">Filter</label>
          </div>

          <div className="col-auto">
            <input type="text" name="filter" className="form-control" onChange = {filter} />
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <td>User ID</td>
              <td>ID</td>
              <td>Title</td>
              <td>Body</td>
            </tr>
          </thead>
          {posts.map((post, x) => (
          <tbody>
            <td>{post.userId}</td>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tbody>
          ))}
        </table>
      </div>
    </>
    );
  }
 
export default Data;