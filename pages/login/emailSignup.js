

// import "firebase/auth";
// import {useState} from 'react';
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import {Container,Content, Header, Form, Input, Item, Button, Label,} from 'native-base'
// import firebase from 'firebase/app';
// import {firebase_db} from '../../firebaseConfig';

// const firebaseConfig = {
//     apiKey: "AIzaSyCFUcLFu6UnJgbX1QHYyAuqzn03dR9oLXM",
//       authDomain: "webrokeup.firebaseapp.com",
//       databaseURL: "https://webrokeup-default-rtdb.asia-southeast1.firebasedatabase.app/",
//       projectId: "webrokeup",
//       storageBucket: "webrokeup.appspot.com",
//       messagingSenderId: "514543696025",
//       appId: "1:514543696025:web:c3e3f5360191728c49a008",
//       measurementId: "G-6ECY7LWR9G"
//   };
  
//   if (firebase.apps.length==0){
//     firebase.initializeApp(firebaseConfig);
//   }

// //이메일 형식 맞추는 함수
//   function isEmail(asValue) {
//     var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
//     return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
//   }

  
// // firebase에 있는 current user 가져와서 중복확인 하고싶다
//   const getLoggedInUser= () => {
//     const currentUser = App.firebase.auth().currentUser
//     if (currentUser) {
//       return {
//         email: currentUser.email,
//         userId: currentUser.uid,
//         isEmailVerified: currentUser.emailVerified
//       }
//     } else {
//       return undefined
//     }
//   },

//    class emailSignup extends React.Component {

//     constructor(props) {
//       super(props);
//       this.state = {
//         email: "",
//         password: "",
//         confirmPassword:"",
//       };
//     }

   
    
//       //위에서 가져온 currentUser와 지금 입력한 emailUser를 비교해 중복확인 실제로 돌리는 함수
//       //email user는 아래 onSignin에서 정의했는데 제대로 안된것같다ㅠㅠ 이것은 google login 함수 보고 따라한건데 모르겠다..
//  isUserEqual = (emailUser, currentUser) => {

//   if (currentUser) {
//     var providerData = currentUser.providerData;
//     for (var i = 0; i < providerData.length; i++) {
//       if (
//         providerData[i].providerId ===
//           firebase.auth.EmailAuthProvider.PROVIDER_ID &&
//         providerData[i].uid === emailUser.getBasicProfile().getId()
//       ) {
//         // We don't need to reauth the Firebase connection.
//         return true;
//       }
//     }
//   }
//   return false;
// };

// //비밀번호 형식 확인
// isPassword(asValue) {
//   var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
//   return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
// }

// //  이메일 형식 확인 함수 isEmail 가지고 와서 실제로 확인, 너무 빨리 확인되지 않고 시간이 지나서 확인할 수 있도록 시간정하기? 아니면 중복확인 버튼을 만들어야하나?
//       checkValidEmail = () => {
//         let timer;
//         if (timer) {
//           clearTimeout(timer);
//         }
//         timer = setTimeout(() => {
//           if (!isEmail(this.state.email)) {
//             this.setState({ isValidEmail: false });
//             alert ("유효한 이메일이 아닙니다.")
//           } else {
//             this.setState({ isValidEmail: true });
//           }
//         }, 500);
//       };



//       //회원가입이후 자동적으로 로그인을 시켜주고, userdata, uid를 firebase realtime database에 저장 
//       onSignIn = emailUser => {
//         console.log('Auth Response', emailUser);
//         // We need to register an Observer on Firebase Auth to make sure auth is initialized.
//         var unsubscribe = firebase.auth().onAuthStateChanged(
//           function(firebaseUser) {
//             unsubscribe();
//             // Check if we are already signed-in Firebase with the correct user.
           
//               var credential = firebase.auth.EmailAuthProvider.credential(
//                 email,password
//               );
//               firebase
//                 .auth()
//                 .signInAndRetrieveDataWithCredential(credential)
//                 .then(function(result) {
//                   console.log('user signed in ');
          
//                         firebase
//                       .database()
//                       .ref('/users/' + result.user.email)
//                       .set({
//                         uid: result.user.uid,
//                         name: result.additionalUserInfo.name,
//                         created_at: Date.now()
//                       })
//                       .then(function(snapshot) {
//                         // console.log('Snapshot', snapshot);
//                       });
//                   }) 
//                 .catch(function(error) {
//                   // Handle Errors here.
//                   var errorCode = error.code;
//                   var errorMessage = error.message;
//                   // The email of the user's account used.
//                   var email = error.email;
//                   // The firebase.auth.AuthCredential type that was used.
//                   var credential = error.credential;
//                   // ...
//                 }.bind(this)
//         )
//               })};

//       //회원가입 들어와서 이메일 중복 확인 -> 중복이 아니라면-> 비밀번호 일치확인 -> 일치하면-> 이메일 유효성 확인-> 비밀번호 유효성확인 -> 회원가입
//       //-> 회원가입 성공하면 로그인 -> onsignin 함수에서 데이터 정보 저장
     
//       handleSignUp = (email,password,confirmPassword) => {
     

//         if (!getLoggedInUser(email, currentUser)) {
//           alert("이미 계정이 있습니다! 로그인 해주세요")
     
//         }
//         else{

//       try {
  
//           const { password, confirmPassword } = this.state;
//           if (password !== confirmPassword) {
//             alert("비밀번호가 일치하지 않습니다!");}
//             else{
//               this.checkValidEmail();   
//               this.isPassword();
//         const { email, password } = this.state
//         firebase.auth()
//             .createUserWithEmailAndPassword(email, password)
//             .catch(error => console.log(error))
//          //   console.log(currentUser)
  
//           const user = firebase.auth().currentUser
//             }

//           if (result.type === 'success') {
//               const credential = firebase.auth.EmailAuthProvider.credential(email,password);
//               firebase
//               .auth()
//               .signInWithCredential(credential)
    
//               onSignIn(result);
//               return result.email;
    
//             }else {
//               return { cancelled: true };
//             }
//           }catch (error) {
//             console.log(error.toString(error));
//           }
//         }}
    


   

//     render () {
//       return(
//           <Container style={styles.container}>
//               <Form>

//                   <Item floatingLabel>
//                       <Label>Email</Label>
//                       <Input
//                        autoCorrect={false}
//                        autoCapital="none"
//                        onChangeText={(email)=>this.setState({email})}/>
                      
//                   </Item>
//                   <Item floatingLabel>
//                       <Label>Password</Label>
//                       <Input
//                       secureTextEntry={true}
//                        autoCorrect={false}
//                        autoCapital="none"
//                        onChangeText={(password)=>this.setState({password})}/>
                       
                      
//                   </Item>
//                   <Item floatingLabel>
//                       <Label>password confirm</Label>
//                       <Input
//                        autoCorrect={false}
//                        autoCapital="none"
//                        onChangeText={(confirmPassword)=>this.setState({confirmPassword})}/>
                      
//                   </Item>
                 
  
//                   <Button style={{marginTop:10}}
//                   full
//                   rounded
//                   primary
//                   onPress={()=>this.handleSignUp(this.state.email,this.state.password, this.state.confirmPassword)}  
//                   >
//                       <Text>Sign Up</Text>
//                   </Button>

//                   <Button style={{marginTop:10}}
//                   full 
//                   rounded
//                   success
//                   onPress={()=>{navigation.navigate('emailLogin')}}          
//                   >
//                       <Text>이미 계정이 있으시다면! 로그인</Text>
//                   </Button> 
//               </Form>
//           </Container>
//       )
//   };
//   }
  


//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//     }
// //   });

// export default emailSignup;

//extra message