import "firebase/auth";
import {useState} from 'react';
import React,  { Component } from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
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
    onSharePress = (emailLogin) => {
      Share.share(emailLogin);  
   }
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        confirmPassword:"",
      };
    }
// 비밀번호랑 비밀번호 확인이 일치하면, 형식까지 맞는지 확인하고 true 리턴하는 함수 
checkPassword= (password,confirmPassword)=> {
    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다!");}
    else{
      //  isPassword(password) {
            var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
            return regExp.test(password); // 형식에 맞는 경우 true 리턴} // 이함수도 제대로 안되고 있는듯 
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
//[Error: The email address is already in use by another account.] 새로운 이메일인 데도 이런 오류가 뜨곤함 
      checkEmail=(email)=>{
        console.log('checkEmail()');
        console.log({email});
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const isCheckEmail = regExp.test(email);
        console.log({isCheckEmail});
        return isCheckEmail;
        // return regExp.test(email); // 형식에 맞는 경우 true 리턴
        //여기에 중복확인 함수 넣고 싶다....
      }
      handleSignUp = async(email,password,confirmPassword) => {
        console.log('handleSignUp()');
        console.log({email,password,confirmPassword});
      // try {
        const isCheckEmail = await this.checkEmail(email); // 함수와 함수 파라미터의 관계
        console.log({isCheckEmail});
        if (isCheckEmail == false) {
          return; // early return
        }
        const isCheckPassword = await this.checkPassword(password,confirmPassword);
        console.log({isCheckPassword});
        if (isCheckPassword == false) {
          return '-_-?'; // early return
        }
        // alert나고도 바로 회원가입이 되는 문제... 이게 둘다 true로 리턴되면 아래 함수를 시행하라는 코드는 어떻게 짜나요.?
        console.log('.');
        const userCredential = await firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
              console.log({error});
              alert(error);
            });
        console.log('..');
        // 좌항과 우항
        // const userCredential = firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log({userCredential});
        const isValid = (userCredential > ''); // 제가 (이은국씨가) 개인적으로 즐겨하는 truthy 체크 방법
        if (isValid == false) {
          return; // 이 아래로 진행시키지 않는다.
        }
        console.log({'userCredential.user': userCredential.user});
        firebase
          .database()
          .ref('/users/' + userCredential.user.uid)
          .set({
            email: userCredential.user.email,
            user_uid: userCredential.user.uid,
            created_at: Date.now(),
          })
          .then(function(snapshot) {
            console.log('Snapshot', snapshot);
          });
        // 회원가입 후 발급받은 credential로 바로 로그인하고 database에 저장까지
        // Error: signInWithCredential failed: First argument "credential" must be a valid credential.이렇게뜸 
        // 그럼에도 바로 로그인 되는거보니 필요없는 함수인가...? 
        //database 저장은 한번도 성공 못함...
        // firebase.auth()
        //         .signInWithCredential(credential) 
        //         // signInWithCredential은 뭣이고, credential은 뭣인가!
        //         // signIn 즉 로그인의, With 즉 방식은
        //         // 다양한 방법이 있다.
        //         // 그 중에서 Credential은.. Credential로 로그인 하는 것이고,
        //         // 그 밖에 .signInWithEmailAndPassword() 등등이 있다.
        //         // 즉, Credential은 다른 로그인 주체가, 해당 로그인 주체의 아이디/패스워드로
        //         // 로그인이 정상적으로 되었음을 증명하는 방식이다! (사실 겁나 생략되어있음)
        //         .then(function(result) {
        //           // then: signInWithCredential() 이 성공하면, 이 부분을=이 함수를 실행합니다!
        //           // * 근데 왜, 굳이? 함수로 어쩌구 하나요? *
        //           // -> callback을 알아야 하고, 그래서 async-await를 알아야 하고, 그래서 promise를 알아야 하고!
        //           // -->> 그래서 다시, callback을 대체 왜 쓰는지? 알아야 하고
        //           // --->>> 그래서, 또다시, 비동기 프로그래밍이 뭔지? 왜 쓰는지? 왜 일케 귀찮게 하는지!
        //           // ....를 알아야 한다!
        //           console.log('firebase.auth().signInWithCredential(credential)');
        //           // ` : javascript template literal
        //           // 제가 멋부릴려고 쓴거에 더 가깝습니다 T_T;
        //           console.log({credential, result});
        //           console.log('user signed in ');
        //             firebase
        //               .database()
        //               .ref('/users/' + result.user.uid)
        //               .set({
        //                 email: result.user.email,
        //                 user_uid:result.user.uid,
        //                 created_at: Date.now()
        //               })
        //               .then(function(snapshot) {
        //                 console.log('Snapshot', snapshot);
        //               });
        // })}
        // catch (error) {
        //     console.log(error.toString(error));
        //   }
        // }
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
                  onPress={() =>this.props.navigation.navigate('emailLogin')}                  >
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
