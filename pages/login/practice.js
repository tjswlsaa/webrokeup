import * as React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native';
import {Container,Content, Header, Form, Input, Item, Button, Label,} from 'native-base'
import firebase from 'firebase/app';
import {firebase_db} from '../../firebaseConfig';
import 'firebase/auth'
import{
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
}

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


export default class login extends React.Component {

constructor(props){
    super(props)

    this.state=({
        email:'',
        password:''
    })
}

signUpUser=(email,password)=>{

try{
    if(this.state.password.length<6)
    {alert("Please enter atleast 6 characters")
return;}
    firebase.auth().createUserWithEmailAndPassword(email,password)
}
catch(error){
    console.log(error.toString())
}

}
loginUser=(email,password)=>{

    try{
        firebase.auth().signInWithEmailAndPassword(email,password).then(function (user){
            console.log(user)
        })
    }
    catch (error){
    console.log(error.toString())
}}

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
                success
                onPress={()=>this.loginUser(this.state.email,this.state.password)}
                >
                    <Text>Login</Text>
                </Button>

                <Button style={{marginTop:10}}
                full
                rounded
                primary
                onPress={()=>this.signUpUser(this.state.email,this.state.password)}

                >
                    <Text>Sign Up</Text>
                </Button>
            </Form>
        </Container>
    )
};
}

const styles= StyleSheet.create ({
    container:{
        flex:1,
        backgroundColor:"#fff",
        justifyContent:"center",
        padding:10
    },
})