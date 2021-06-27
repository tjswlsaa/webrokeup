import React, {useState} from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native';
import {Container,Content, Header, Form, Input, Item, Button, Label,} from 'native-base'
import firebase from 'firebase/app';
import {firebase_db} from '../../firebaseConfig';
import 'firebase/auth'
import{
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    StyledFormArea,
    SubTitle,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,

}from '../../components/styles';
import {Formik} from 'formik';

import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

const aboutBookImage = "https://cdn.boldomatic.com/content/post/suy6Pg/We-broke-up?size=800"
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

  import {Colors} from '../../components/styles'
  const {brand,darkLight, primary} =Colors;

const Login =({navigation,route})=> {

    const [hidePassword, setHidePassword]= useState(true);

    return (
        <StyledContainer>
            <InnerContainer>
                <PageTitle>우리 헤어졌어요</PageTitle>
                <SubTitle>로그인</SubTitle>
                <Formik
                initialValues={{email:'', password:''}}
                onSubmit={(values)=>{
                    console.log(values);
                    
                }}
                >
                    {({handleChange,handleBlur,handleSubmit,values})=>
                        (<StyledFormArea>
                            <MyTextInput
                            label="이메일"
                            icon="mail"
                            placeholder="webrokeup@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            />

                        <MyTextInput
                            label="비밀번호"
                            icon="lock"
                            placeholder="********"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />
                            <MsgBox>...</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </StyledButton>
                        <Line />

                        <StyledButton google={true} onPress={handleSubmit}>
                            <Fontisto name="google" color={primary} size={20}/>
                            <ButtonText google={true}>
                                Sign in with Google
                            </ButtonText>
                        </StyledButton>
                        <ExtraView>
                            <ExtraText>계정이 없으신가요?</ExtraText>
                            <TextLink  onPress={()=>{navigation.navigate('Signup')}}>
                            <TextLinkContent>SignUp</TextLinkContent>
                            </TextLink>
                            
                        </ExtraView>
                        </StyledFormArea>
                    
                        )}

                </Formik>
            </InnerContainer>
        </StyledContainer>
    )
};

const MyTextInput =({label,icon,isPassword,hidePassword,setHidePassword,...props})=>{
return(
    <View>
<LeftIcon>
    <Octicons name={icon} size={20} color={brand}/>
</LeftIcon>
<StyledInputLabel>{label}</StyledInputLabel>
<StyledTextInput {...props}></StyledTextInput>
{isPassword && (
    <RightIcon onPress={()=>setHidePassword(!hidePassword)}>
        <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={20} color={darkLight}></Ionicons>
    </RightIcon>

)}
    </View>
)}

export default Login; 