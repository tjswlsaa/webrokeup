
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {Container,Content, Header, Form, Input, Item, Button, Label,} from 'native-base'


import firebase from 'firebase/app';
import {firebase_db} from '../../firebaseConfig';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyCFUcLFu6UnJgbX1QHYyAuqzn03dR9oLXM",
      authDomain: "webrokeup.firebaseapp.com",
      databaseURL: "https://webrokeup-default-rtdb.asia-southeast1.firebasedatabase.app/",
      projectId: "webrokeup",
      storageBucket: "webrokeup.appspot.com",
      messagingSenderId: "514543696025",
      appId: "1:514543696025:web:c3e3f5360191728c49a008",
      measurementId: "G-6ECY7LWR9G"
  };

  if (firebase.apps.length==0){
    firebase.initializeApp(firebaseConfig);
  }



const ProfileScreen = ({ route, navigation }) => {


    
  const { user } = route.params;
  console.log("user from google", user);
  return (
  

      <Container style={styles.container}>
            <Form>
                <Item floatingLabel>
                    <Label>작가닉네임</Label>
                    <Input
                     autoCorrect={false}
                     autoCapital="none"
                     onChangeText={(nickname)=>this.setState({nickname})}/>
                    
                </Item>

                <Item floatingLabel>
                    <Label>dateofbirth</Label>
                    <Input
                    secureTextEntry={true}
                     autoCorrect={false}
                     autoCapital="none"
                     onChangeText={(dateofbirth)=>this.setState({dateofbirth})}/>
                     
                    
                </Item>

                <Button style={{marginTop:10}}
                full
                rounded
                success
                onPress={()=>this.saveUser(this.state.nickname,this.state.dateofbirth)}
                >
                    <Text>저장하기</Text>
                </Button>

     
            </Form>
        </Container>
      
    )
};


const styles= StyleSheet.create ({

})






export default ProfileScreen;