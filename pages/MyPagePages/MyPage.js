import React, {Children, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight, Platform} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../../firebaseConfig';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/app'

const MyBookItem = ({navigation, myitem, bookKey}) => {
    return (
        <TouchableHighlight onPress={()=>{navigation.navigate('MyBook', {myitem: myitem, bookKey: bookKey})}}>
            <View>
                <Text>{myitem.bookTitle}</Text>
                <Image style={styles.bookButtonImage} source={{uri:myitem.image}} />
            </View>
        </TouchableHighlight>
    )
}
const MyPage = ({navigation, route}) => {
    const [myBook, setMyBook] = useState([]);



    useEffect(() => {
        let temp = [];
        let data = firebase_db.ref('book/')
            .on('value', (snapshot) => {
                snapshot.forEach((child) => {
                    temp.push(child.val());
                })
                setMyBook(temp);
            })
    }, [])


    
    var user = firebase.auth().currentUser;
    var  user_uid
    
    if (user != null) {
    
      user_uid = user.uid;  
    }
  
    // console.log(user_uid)

    function renderMyBook() {
        console.log(myBook)
        
        // const BookKey = Object.keys(myBook).toString();
        // console.log(BookKey);
        // console.log(list);

    //     useEffect     let bookKeyRef = firebase_db.ref('book/')
    // // console.log(bookKeyRef);
    // // const bookKey = Object.values(key) 
    // // console.log(bookKey);
    // bookKeyRef.on('value', (snapshot) => {
    //     const book = snapshot.val()
    //     console.log(book) // I get there onlye once !
    // },

        const filteredList = myBook.filter(filteredMyBook => filteredMyBook.user_uid == user_uid);
        const list = filteredList.map(myitem =>
            <MyBookItem
                navigation = {navigation}
                myitem = {myitem}
                bookKey = {myitem.bookKey}/>)
        return list;
    
        }

return (
    <View style={styles.container}>
        <View style={styles.profileContainer}>
            <View style={styles.settingPlusUserNameContainer}>
                <Text style={styles.profileUserName}>작가이름</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('setting')}}>
                    <Icon name="settings-outline" size={25} color="black" style={styles.settingIcon}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.profileUserDesc}> 상태 메세지 2줄까지 가능</Text>
        </View>
        <ScrollView style={styles.container}>
            <StatusBar style="white" />
            <View  style={styles.subContainer}>
                <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('PopularBook')}}>
                    <Text style={styles.tagText}>나의 이별북</Text>
                </TouchableOpacity>
                <ScrollView style={styles.cardContainer} horizontal = {true}>
                    { renderMyBook() }
                </ScrollView> 
                <TouchableOpacity style= {{alignSelf: "center", padding: 20, paddingHorizontal: 150,backgroundColor: "#FE8D6F"}}onPress={()=>{navigation.navigate("MakeNewBook")}}>
                    <Text style ={{fontWeight:"600", fontSize: 15}}>새로운 책 만들기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
)}
const styles = StyleSheet.create({
    container : {
        backgroundColor: '#fff',
    },
    subContainer: {
        height:400,
    },
    tag:{
        height:"20%"
    },
    tagText:{
        fontSize: 17,
        fontWeight: "600",
        marginTop: "5%",
        marginLeft:"5%"
    },
    cardContainer:{
        marginTop: "3%",
        width: "100%",
        height: "25%",
        backgroundColor: "#fff",
    },
      bookButtonImage: {
        backgroundColor: "grey",
        width: 200,
        height: "90%",
        marginRight:5,
        marginLeft:16,
    },
    profileContainer:{
      //컨텐츠의 넓이 값
      width:'95%',
      //컨텐츠의 높이 값
      height:"20%",
      //컨텐츠의 모서리 구부리기
      //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
      //각 속성의 값들은 공식문서에 고대로~ 나와 있음
      alignSelf:"center",
      marginTop:"5%",
      },
      settingPlusUserNameContainer:{
      flexDirection:"row",
      },
      profileUserName:{
      fontSize: 18,
      marginTop:"8%",
      marginLeft:"8%"
      },
      settingIcon:{
      marginTop:"5%",
      marginLeft: "75%",
      flexDirection: 'row',
      },
      profileUserDesc: {
      fontSize: 16,
      marginTop:"5%",
      marginLeft:"7%"
      },
})
export default MyPage;