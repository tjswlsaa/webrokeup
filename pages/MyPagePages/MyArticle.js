import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Touchable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {firebase_db} from '../../firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import {MakeNewBook} from './MakeNewBook';
//import defaultExport from '@react-native-firebase/auth';



const MyArticle = ({navigation, route}) => {
    const {myitem, chapters, chapterTitle} = route.params;
    const {bookKey, chapterKey} = route.params;
    const [data, setData] = useState([])

    // useEffect(()=>{
    //     console.log("실행된당")
    
    //     var key = Object.key
    //     var changeDataRef = firebase_db.ref(`book/${key}/chapters`);

    //     changeDataRef.on("value",(snapshot) =>{
    //       console.log(snapshot)
     
    //       const tmp = [];
    //       snapshot.forEach((child)=>
    //         tmp.unshift({
    //           key:child.key,
    //           chapterTitle:child.val().chapterTitle,
    //           mainText:child.val().mainText,
    //           regdate:child.val().regdate
    //         })
    //     )
    //     })
    
    //       console.log(tmp);
    //       setData(tmp);
    //   },[])

      

    
    

    return (

        <View style={styles.container}>
            <StatusBar style="white" />

            <View style={styles.upperButtonContainer}>
                <TouchableOpacity style={styles.editButton}>                
                    <Text style={styles.editButtonText}>편집</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.deleteButton} >
                    <Text style={styles.deleteButtonText}>삭제</Text>
                </TouchableOpacity>  
            </View>

            <View>
                <Text style={styles.bookTitle}>{chapterTitle}</Text>  

            </View>
            <ScrollView style={styles.textContainer}>
                
                    <Text style={styles.bookText}>{chapters.mainText}</Text>  
                    <Text style={styles.regdate}>{chapters.regdate}</Text>
        </ScrollView>
        <View style={styles.bottomButtonContainer}>

                <TouchableOpacity style={styles.likeButton}>                
                    <Text style={styles.likeButtonText}>공감</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.commentButton}>
                    <Text style={styles.commentButtonText}>댓글</Text>
                </TouchableOpacity>  
            </View>
        </View>
    )}

const styles = StyleSheet.create({ 

    container: {
        //앱의 배경 색
        backgroundColor:"#F5F4F4",
                flex:1
      },

      upperButtonContainer: {
        flex:1,
        flexDirection:"row",
        alignSelf:"flex-end",
        marginTop: "15%",
        marginRight:"10%"


      },

      editButton: {
          
      },
      deleteButton: {
          marginLeft: "7%"
      },

      textContainer:{
          height: "50%"
      },

      bookTitle:{
        fontSize: 20,
        marginLeft: "5%"

      },
      bookText:{
          marginTop: "20%",
          marginLeft:"10%",
          marginRight:"10%",

      },
      
      regdate: {
          marginLeft : "10%"
      },

      bottomButtonContainer: {
        flex:1,
        flexDirection:"row",
        marginTop: "15%",
        marginRight:"10%"

      },
    
      commentButton: {
        marginLeft: "7%"
    },
    
    likeButton: {
        marginLeft: "10%"

    }

})

export default MyArticle;