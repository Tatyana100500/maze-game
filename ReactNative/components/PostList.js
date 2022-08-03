import React, { useEffect, useState, } from 'react'
import axios from 'axios';
import {Text, StyleSheet, View, FlatList} from 'react-native';

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [photos, setPhotos] = useState([])
  
  useEffect(() => {
	const fetchData = async () => {
	  await axios.get('https://jsonplaceholder.typicode.com/posts').then(posts => {
		setPosts(posts.data) 
      }).catch(e => console.log(e)).then()
	  await axios.get('https://jsonplaceholder.typicode.com/users').then(users => {
		setUsers(users.data) 
      }).catch(e => console.log(e))
	  await axios.get('https://jsonplaceholder.typicode.com/photos').then(photos => {
		setPhotos(photos.data) 
      }).catch(e => console.log(e))
    };
    fetchData();
  }, [])
  let sortedPosts = posts.reduce((acc, post) => {
    if (acc.map[post.userId]) {
      return acc;
	}
    acc.map[post.userId] = true;
	const [ postUser ] = users.filter((user) => post.userId === user.id);
	const userPhotos = photos.filter((photo) => post.userId === photo.albumId);
	if(postUser) {
	const { company, name } = postUser;
    acc.newPosts.push({...post, userName: name, company: company.name, userPhotos });
	} else {
    acc.newPosts.push(post);
	}
    return acc;
  }, { map: {}, newPosts: [] })
  .newPosts;

    return (
		<View style={styles.container}>
		<FlatList data={sortedPosts} 
        renderItem={({item}) => {
			const { id, title, body, userName, company } = item;
		  return (
				<View key={id} style={styles.item}>
				<Text style={styles.userName} >{userName}</Text>
				<Text style={styles.company}>{company}</Text>
		       <Text style={styles.title} >{title}</Text>
			   <Text style={styles.body} >{body}</Text>
			   </View>
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
	  marginBottom: 10,
	  borderRadius: 15,
      backgroundColor: '#DCDCDC',
	},
	userName: {
	  fontSize: 20,
	  fontWeight: 'bold',
	},
	company: {
	  fontSize: 16,
	},
	title: {
	  fontSize: 22,
	  fontWeight: 'bold',
	},
	body: {
	  fontSize: 18,
	}
  });
export default PostsList