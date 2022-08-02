import React, { useEffect, useState, } from 'react'
//import api from '../api'
import axios from 'axios';
import {Text, StyleSheet, ScrollView, View, FlatList} from 'react-native';

//import styled from 'styled-components'
//const Image = styled.img`
///  width: 150px;
//  height: 150px;
//`

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [photos, setPhotos] = useState([])
  //const [isLoading, setisLoading] = useState(false)
  //const isLogin = localStorage.getItem('isLogin')
  //console.log(isLogin)
  useEffect(() => {
	const fetchData = async () => {
	  await axios.get('https://jsonplaceholder.typicode.com/posts').then(posts => {
		//console.log(posts.data)
		setPosts(posts.data) 
      }).catch(e => console.log(e)).then()
	  await axios.get('https://jsonplaceholder.typicode.com/users').then(users => {
		//console.log(users.data)
		setUsers(users.data) 
      }).catch(e => console.log(e))
	  await axios.get('https://jsonplaceholder.typicode.com/photos').then(photos => {
		//console.log(photos.data)
		setPhotos(photos.data) 
      }).catch(e => console.log("????", e))
    };
    fetchData();
  }, [])
  //console.log(posts, users, photos)
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
		<View style={styles.container}>
		<FlatList data={sortedPosts} 
        renderItem={({item}) => {
			const { id, title, body, userName, company, userPhotos } = item;
		  return (
	          //<a  className="list-group-item list-group-item-action list-group-item-light mb-3 rounded border border-secondary">
				//{(userPhotos && userPhotos.length != 0) ? (<Image className='rounded' src={`${userPhotos[0].thumbnailUrl}`}></Image>): null}
				<View key={id} style={styles.item}>
				<Text className="text-dark" >{userName}</Text>
				<Text className="strong m-1">{company}</Text>
		       <Text className="text-bold" >{title}</Text>
			   <Text className="text-dark" >{body}</Text>
			   </View>
		      //</a>
		  )}
		}>
        </FlatList>
		</View>
    )
}
const styles = StyleSheet.create({
	container: {
	 flex: 1,
	 paddingTop: 22
	},
	item: {
	  padding: 10,
	  fontSize: 18,
	},
  });
export default PostsList