import "firebase/auth";
import {useState} from 'react';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Container,Content, Header, Form, Input, Item, Button, Label,} from 'native-base'
import firebase from 'firebase/app';
import {firebase_db} from '../../firebaseConfig';
const firebaseConfig = {
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
   class emailLogin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
      };
    }
    loginUser = async(email, password) => {
        try {
          console.log({email})
         const result= await firebase.auth()
              .signInWithEmailAndPassword(email, password)
              .catch(error => {
                console.log({error});
                alert(error);
              });
          console.log({result})
          const isValid = (result > ''); 
          if (isValid == false) {
            return; // 이 아래로 진행시키지 않는다.
          }
            firebase
            .database()
            .ref('/users/' + result.user.uid)
            .update({
              last_logged_in: Date.now()
            });
            return result.email;
    } catch (error) {
          console.log(error.toString(error));
        }
      };
      render () {
        return(
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                         autoCorrect={false}
                         autoCapital="none"
                         onChangeText={(email)=>this.setState({email})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                        secureTextEntry={true}
                         autoCorrect={false}
                         autoCapital="none"
                         onChangeText={(password)=>this.setState({password})}/>
                    </Item>
                    <Button style={{marginTop:10}}
                    full
                    rounded
                    primary
                    onPress={()=>this.loginUser(this.state.email,this.state.password)}  
                    >
                        <Text>로그인</Text>
                    </Button>
                </Form>
            </Container>
        )
    };
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
      }
    });
  export default emailLogin;