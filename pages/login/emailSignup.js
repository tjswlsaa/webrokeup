

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




   class emailSignup extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        confirmPassword:"",
      };
    }

   

// 비밀번호랑 비밀번호 확인이 일치하면 형식까지 맞는지 확인하고 true 리턴하는 함수 
checkPassword= (password,confirmPassword)=> {
    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다!");}
        
    else{
      //  isPassword(password) {
            var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
            return regExp.test(password); // 형식에 맞는 경우 true 리턴}
               }
}

// 이메일 형식이 맞다면 firebase 기존 유저와 중복인지 분석하는 함수!
// 어떻게 중복 확인 하는 함수 세울지 모르겠음 ㅠㅠ
// current user 불러오는 함수로 데이터 가져오고 일치하는지 확인하고 싶었는데 current user가 없다고 계속 에러가 남 
//이렇게...
//   const getLoggedInUser= () => {
//     currentUser = firebase.auth().currentUser;

//     if (currentUser) {
//       return {
//         currentUserEmail: currentUser.email,
//       }
//     } else {
//       return undefined
//     }
//   }
// [Error: The email address is already in use by another account.] 이미 알아서 alert가 뜨고 있는데 이걸 유져한테 보일 방법이 있을까??

checkEmail=(email)=>{
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(email); // 형식에 맞는 경우 true 리턴
      //여기에 중복확인 함수 넣고 싶다....
}

      handleSignUp = async(email,password,confirmPassword) => {
     
      try {
    
        await this.checkEmail()
        await this.checkPassword()

        // alert나고도 바로 회원가입이 되는 문제... 이게 둘다 true로 리턴되면 아래 함수를 시행하라는 코드는 어떻게 짜나요.?

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => console.log(error))
        const credential = firebase.auth().createUserWithEmailAndPassword(email, password)

        // 회원가입 후 발급받은 credential로 바로 로그인하고 database에 저장까지
        // Error: signInWithCredential failed: First argument "credential" must be a valid credential.이렇게뜸 
        // 그럼에도 바로 로그인 되는거보니 필요없는 함수인가...? 
        //저장은 한번도 성공 못함...
        firebase.auth()
                .signInWithCredential(credential)
                .then(function(result) {
                  console.log('user signed in ');
                    firebase
                      .database()
                      .ref('/users/' + result.user.uid)
                      .set({
                        email: result.user.email,
                        user_uid:result.user.uid,
                        created_at: Date.now()
                      })
                      .then(function(snapshot) {
                        console.log('Snapshot', snapshot);
                      });
                 

        })}
        
        catch (error) {
            console.log(error.toString(error));
          }
        }

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
                  <Item floatingLabel>
                      <Label>password confirm</Label>
                      <Input
                       autoCorrect={false}
                       autoCapital="none"
                       onChangeText={(confirmPassword)=>this.setState({confirmPassword})}/>
                      
                  </Item>
                 
  
                  <Button style={{marginTop:10}}
                  full
                  rounded
                  primary
                  onPress={()=>this.handleSignUp(this.state.email,this.state.password, this.state.confirmPassword)}  
                  >
                      <Text>Sign Up</Text>
                  </Button>

                  <Button style={{marginTop:10}}
                  full 
                  rounded
                  success
                  onPress={()=>{navigation.navigate('emailLogin')}}          
                  >
                      <Text>이미 계정이 있으시다면! 로그인</Text>
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

export default emailSignup;

