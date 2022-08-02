import React, { useEffect, useState, } from 'react'
//import api from '../api'
import axios from 'axios';

import styled from 'styled-components'
const Image = styled.img`
  width: 150px;
  height: 150px;
`

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [photos, setPhotos] = useState([])
  //const [isLoading, setisLoading] = useState(false)
  const isLogin = localStorage.getItem('isLogin')
  console.log(isLogin)
  useEffect(() => {
	const fetchData = async () => {
	  await axios.get('https://jsonplaceholder.typicode.com/posts').then(posts => {
		setPosts(posts.data) 
      }).catch(e => console.log(e)).then()
	  await axios.get('https://jsonplaceholder.typicode.com/users').then(users => {
		setUsers(users.data) 
      }).catch(e => console.log(e))
	  await axios.get('https://jsonplaceholder.typicode.com/photos').then(photos => {
		//console.log(photos.data)
		setPhotos(photos.data) 
      }).catch(e => console.log("????", e))
    };
    fetchData();
  }, [isLogin])
  console.log(posts, users, photos)
  let sortedPosts = posts.reduce((acc, post) => {
    if (acc.map[post.userId]) {
      return acc;
	}
    acc.map[post.userId] = true;
	const [ postUser ] = users.filter((user) => post.userId === user.id);
	const userPhotos = photos.filter((photo) => post.userId === photo.albumId);
	if(postUser) {
	const { company, name } = postUser;
	//console.log(userPhotos)
	
    acc.newPosts.push({...post, userName: name, company: company.name, userPhotos });
	} else {
    acc.newPosts.push(post);
	}
    return acc;
  }, { map: {}, newPosts: [] })
  .newPosts;

console.log(sortedPosts);

    return (
	  <div className="container">
		<div className="list-group">
        { (sortedPosts.map(({ id, title, body, userName, company, userPhotos }) => {
			
		  return (
	          <a href="#"  key={id} className="list-group-item list-group-item-action list-group-item-light mb-3 rounded border border-secondary">
				{(userPhotos && userPhotos.length != 0) ? (<Image className='rounded' src={`${userPhotos[0].thumbnailUrl}`}></Image>): null}
				<div className="text-dark" >{userName}<span className="strong m-1">{company}</span></div>
		        <div className="text-bold" >{title}</div>
				<div className="text-dark" >{body}</div>
		      </a>
		  )
	      }))
		}
        </div>
	  </div>
    )
}
export default PostsList